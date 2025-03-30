import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { db } from "../server";
import { handleError, HttpError } from "../errorHandling";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export async function register(req: Request, res: Response) {
  const { email, password, first_name, last_name, dob } = req.body;

  try {
    const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      throw new HttpError("Użytkownik już istnieje", 400);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await db.query(
      `INSERT INTO users (email, password, first_name, last_name, dob) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name`,
      [email, hashedPassword, first_name, last_name, dob]
    );

    res.status(201).json({ message: "Użytkownik utworzony!", user: newUser.rows[0] });
  } catch (error) {
    handleError(error, res)
  }
};

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      throw new HttpError("Nieprawidłowy email lub hasło", 401);
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError("Nieprawidłowy email lub hasło", 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Zalogowano pomyślnie", token });
  } catch (error) {
    handleError(error, res)
  }
};
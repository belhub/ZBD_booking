import { Request, Response } from "express";
import { pool } from "../server";
import { handleError } from "../errorHandling";

export async function getUsers(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    handleError(error, res)
  };
}

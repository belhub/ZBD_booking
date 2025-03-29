import { Response } from "express";

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export function handleError(err: HttpError | unknown, res: Response,) {
  console.error(err);

  // błąd httpError
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  // inny błąd
  return res.status(500).json({
    error: "Wystąpił nieoczekiwany błąd serwera",
  });
};

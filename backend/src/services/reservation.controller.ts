import { Request, Response } from "express";
import { handleError } from "../errorHandling";
import { db } from "../server";
import { AddPaymentDto, CreateReservationDto, CreateReservationResponseDto, reservationStatus } from "@shared/dtos/hotelDto";
import * as dayjs from 'dayjs';

export async function createReservation(req: Request, res: Response) {
  const { roomIds, start_date, end_date } = req.body as CreateReservationDto;
  const userId = 2; //mock
  const status: reservationStatus = "pending";
  const reservationsIds: CreateReservationResponseDto[] = [];

  try {
    for (const roomId of roomIds) {
      const insertReservationQuery = `
        INSERT INTO reservation ("userId", start_date, end_date, status)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;
      const reservationId = (await db.query(insertReservationQuery, [userId, start_date, end_date, status])).rows[0].id;

      await db.query(`
        INSERT INTO room_reservation ("roomId", "reservationId") 
        VALUES ($1, $2)`,
        [roomId, reservationId]);

      reservationsIds.push({ roomId, reservationId });
      const dates = [];
      let current = dayjs(start_date);
      const end = dayjs(end_date);

      while (!current.isSame(end)) {
        dates.push(current.format('YYYY-MM-DD'));
        current = current.add(1, 'day');
      }

      await HandleRoomOccupancy(dates, roomId);

      const insertPaymentQuery = `
        INSERT INTO payment ("reservationId", status, value)
        VALUES ($1, $2, $3)`;

      await db.query(insertPaymentQuery, [reservationId, "pending", 0])
    }
    res.status(201).json(reservationsIds);
  } catch (error) {
    handleError(error, res);
  }
}

async function HandleRoomOccupancy(dates: string[], roomId: number) {
  dates.map(async date => (
    await db.query(`
        INSERT INTO room_occupancy ("roomId", "date") 
        VALUES ($1, $2)`,
      [roomId, date])
  ));
}

export async function PayForReservations(req: Request, res: Response) {
  // jmeter - scenariusze
  // apache benchmark 
  // siege 
  const payments = req.body as AddPaymentDto[];
  const insertPaymentQuery = `
    INSERT INTO payment ("reservationId", status, value)
    VALUES ($1, $2, $3)`;
  try {
    for (const payment of payments) {
      const existing = await db.query(
        'SELECT 1 FROM payment WHERE "reservationId" = $1',
        [payment.reservationId]
      );

      if (existing.rowCount === 0) {
        await db.query(insertPaymentQuery, [payment.reservationId, payment.status, payment.value])
      } else {
        await db.query(
          'UPDATE payment SET status = $2, value = $3 WHERE "reservationId" = $1',
          [payment.reservationId, payment.status, payment.value]
        );
      }
    }
    res.status(201);
  } catch (error) {
    handleError(error, res);
  }
}
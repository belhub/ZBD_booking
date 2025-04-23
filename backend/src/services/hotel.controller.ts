import { Request, Response } from "express";
import { handleError } from "../errorHandling";
import { db } from "../server";
import { CreateHotelDto, GetAvailableHotelsDto, HotelDetailsDto, HotelDto, RoomDto } from "@shared/dtos/hotelDto";

export async function getAvailableHotelsForDate(req: Request, res: Response) {
  const { start_date, end_date, city, capacity } = req.params as unknown as GetAvailableHotelsDto;

  try {
    const availableHotels = await db.query<HotelDto[]>(`
      SELECT
        hotel.id, 
        hotel."userId", 
        hotel.name, 
        address.country,
        address.city,
        address.street,
        address.number,
        address.postal_code,
        array_agg(room.id) AS available_room_ids
      FROM
        hotel
      JOIN
        address ON hotel."addressId" = address."id" 
      JOIN
        room ON hotel."id" = room."hotelId"
      WHERE
        address."city" = $1
        AND room."capacity" >= $4
        AND NOT EXISTS (
          SELECT 1
          FROM room_occupancy ro
          WHERE ro."roomId" = room.id
          AND ro.date BETWEEN $2 AND $3
        )
      GROUP BY
        hotel.id, hotel."userId", hotel.name, address.country, address.city, address.street, address.number, address.postal_code
      `, [city, start_date, end_date, capacity]);

    res.status(200).json(availableHotels.rows);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getHotelDetails(req: Request, res: Response) {
  const { id, roomIds } = req.params as unknown as { id: number; roomIds: string };
  const roomIdsNum = roomIds.split(',').map(r => Number(r));

  try {
    const hotelDetails = await db.query<HotelDetailsDto>(`
      SELECT 
      hotel.id,
      hotel.name,
      address.city,
      address.street,
      address.number,
      address.postal_code,
      address.country
      FROM hotel
      JOIN address ON hotel."addressId" = address.id
      WHERE hotel.id = $1;`,
      [id]);

    const rooms = (await db.query<RoomDto>(`
      SELECT 
      id,
      capacity,
      price,
      description
      FROM room
      WHERE room."hotelId" = $1 AND id = ANY($2::int[]);`,
      [id, roomIdsNum])).rows;

    res.status(200).json({ ...hotelDetails.rows[0], rooms: rooms });
  } catch (error) {
    handleError(error, res);
  }
}

export async function hotelRooms(req: Request, res: Response) {
  const id = req.params as unknown as number
  try {
    const hotelRooms = await db.query<HotelDto>(`
      SELECT *
      FROM room
      WHERE "hotelId" = $1; `,
      [id])
    res.status(200).json(hotelRooms.rows);
  } catch (error) {
    handleError(error, res);
  }
}

export async function createHotelWithAddress(req: Request, res: Response) {
  const { name, street, city, country, number, postal_code } = req.body as CreateHotelDto;
  const userId = 2; //mock

  try {
    const addressId: number = (await db.query(`
      INSERT INTO address (street, city, country, number, postal_code) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING id`,
      [street, city, country, number, postal_code])).rows[0].id;

    const hotel = await db.query<{ id: number }>(`
      INSERT INTO hotel (name, "addressId", "userId") 
      VALUES ($1, $2, $3) 
      RETURNING id`,
      [name, addressId, userId]);

    res.status(201).json({ hotelId: hotel.rows[0].id })
  } catch (error) {
    handleError(error, res);
  }
}


export async function updateHotelInfo(req: Request, res: Response) {
  const hotelId = req.params.id;
  try {
    // todo
  } catch (error) {
    handleError(error, res);
  }
}
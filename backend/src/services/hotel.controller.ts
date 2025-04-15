import { Request, Response } from "express";
import { handleError } from "../errorHandling";
import { db } from "../server";
import { CreateHotelDto, GetAvailableHotelsDto, HotelDto } from "@shared/dtos/hotelDto";
//todo wyszukiwanie pokoju i tworzenie rezerwacji

export async function getAvailableHotelsForDate(req: Request, res: Response) {
  // todo dodać parametr wyszukiwania na ile osób pokój 
  const { start_date, end_date, city, guests } = req.params as unknown as GetAvailableHotelsDto;

  try {
    const getHotelsForCity = await db.query<HotelDto[]>(`SELECT hotel.id, hotel."userId", hotel.name, address.country,address.city,address.street,address.number,address.postal_code FROM hotel JOIN address ON hotel."addressId" = address."id" WHERE address.city = $1;
`, [city]);

    // todo sprawdzanie czy hotel ma wolne pokoje i na ile osób 

    res.status(200).json(getHotelsForCity.rows);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getHotelDetails(req: Request, res: Response) {
  const id = req.params as unknown as number // nie wiem czy tak się powinno robić ale Typy muszą być !!!
  try {
    // todo pobieranie hotelu po id
    console.log("paramID", id);
  } catch (error) {
    handleError(error, res);
  }
}

export async function createHotelWithAddress(req: Request, res: Response) {

  const { name, street, city, country, number, postal_code } = req.body as CreateHotelDto;

  //todo pobieranie UserId z nagłówka z response
  const userId = 2;
  try {
    const addressId: number = (await db.query(`INSERT INTO address (street, city, country, number, postal_code) VALUES ($1, $2, $3, $4, $5) RETURNING id`, [street, city, country, number, postal_code])).rows[0].id;

    const hotel = await db.query<{ id: number }>(`INSERT INTO hotel (name, "addressId", "userId") 
       VALUES ($1, $2, $3) RETURNING id`, [name, addressId, userId]);
    console.log("hotel: ", hotel.rows[0])
    res.status(201).json({ hotelId: hotel.rows[0].id })
  } catch (error) {
    handleError(error, res);
  }
}


export async function updateHotelInfo(req: Request, res: Response) {
  const hotelId = req.params.id;
  try {

  } catch (error) {
    handleError(error, res);
  }
}
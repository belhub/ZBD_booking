import axios from "axios";
import { CreateHotelDto, CreateReservationDto, CreateReservationResponseDto, GetAvailableHotelsDto, HotelDetailsDto, HotelDto } from "@shared/dtos/hotelDto";
/*
// src/services/apiClient.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

import { api } from "./apiClient";

export const getHotels = () => api.get("/hotels");

*/

// todo: logowanie i zablokownie dostępów 
const API_URL = "http://localhost:5634/api/";

export const getHotels = async (reqDto: GetAvailableHotelsDto): Promise<HotelDto[]> => {
  try {
    const response = await axios.get<HotelDto[]>(`${API_URL}hotel/getAvailableHotelsForDate/${reqDto.city}/${reqDto.start_date}/${reqDto.end_date}/${reqDto.capacity}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania dostępnych hoteli:", error);
    return [];
  }
};

export const getHotelDetails = async (hotelId: string, roomIds: string[]): Promise<HotelDetailsDto | null> => {
  try {
    const response = await axios.get<HotelDetailsDto>(`${API_URL}hotel/getHotelDetails/${hotelId}/${roomIds}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania dostępnych hoteli:", error);
    return null;
  }
};

export const createHotelWithAddress = async (createDto: CreateHotelDto) => {
  try {
    const response = await axios.post(`${API_URL}hotel/createHotel`, createDto);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas tworzenia hotelu:", error);
  }
};

export const createReservation = async (createReservationDto: CreateReservationDto): Promise<CreateReservationResponseDto[]> => {
  try {
    const response = await axios.post<CreateReservationResponseDto[]>(`${API_URL}reservation/createReservation`, createReservationDto);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas tworzenia rezerwacji:", error);
    return [];
  }
}
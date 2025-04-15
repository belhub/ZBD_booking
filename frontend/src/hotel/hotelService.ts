import axios from "axios";
import { CreateHotelDto, GetAvailableHotelsDto, HotelDto } from "@shared/dtos/hotelDto";
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

const API_URL = "http://localhost:5634/api/hotel";

export const getHotels = async (reqDto: GetAvailableHotelsDto): Promise<HotelDto[]> => {
  try {
    const response = await axios.get<HotelDto[]>(`${API_URL}/getAvailableHotelsForDate/${reqDto.city}/${reqDto.start_date}/${reqDto.end_date}`);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania dostępnych hoteli:", error);
    return [];
  }
};

export const createHotelWithAddress = async (createDto: CreateHotelDto) => {
  try {
    const response = await axios.post(`${API_URL}/createHotel`, createDto);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas tworzenia hotelu:", error);
  }
};
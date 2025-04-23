import axios from "axios";
import { AddPaymentDto } from "@shared/dtos/hotelDto";

const API_URL = "http://localhost:5634/api/";

export const createPayment = async (addPaymentsDto: AddPaymentDto[]) => {
  try {
    const response = await axios.post(`${API_URL}reservation/createPayment`, addPaymentsDto);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas tworzenia płatności:", error);
  }
}
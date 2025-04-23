export interface HotelDto {
  id: number;
  addressId?: number;
  name: string;
  street: string;
  city: string;
  country: string;
  number: number;
  postal_code: string;
  available_room_ids?: number[];
}

export interface HotelDetailsDto extends HotelDto {
  rooms: RoomDto[];
}

export interface RoomDto {
  id: number;
  hotelId: number;
  capacity: number;
  price: number;
  description: string;
}

export interface GetAvailableHotelsDto {
  city: string;
  start_date: string;
  end_date: string;
  capacity: number;
};

export interface CreateHotelDto {
  name: string;
  street: string;
  city: string;
  country: string;
  number: number;
  postal_code: string;
  userId?: number;
};

export interface CreateReservationDto {
  userId: number;
  roomIds: number[];
  start_date: string;
  end_date: string;
  status?: reservationStatus;
}
export type reservationStatus = "pending" | "confirmed" | "cancelled";

export interface CreateReservationResponseDto { roomId: number; reservationId: number }

export interface AddPaymentDto {
  reservationId: number;
  status: paymentStatus;
  value?: number;
}
export type paymentStatus = "cancelled" | "payed";


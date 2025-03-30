export interface HotelDto {
  id: number;
  addressId: number;
  userId: number;
  name: string;
  street: string;
  city: string;
  country: string;
  number: number;
  postal_code: string;

}
export interface CreateHotelDto {
  name: string;
  street: string;
  city: string;
  country: string;
  number: number;
  postal_code: string;
  userId?: number;
};


export interface GetAvailableHotelsDto {
  city: string;
  end_date: string;
  start_date: string;
};
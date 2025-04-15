import { GetAvailableHotelsDto, HotelDto } from "@shared/dtos/hotelDto";
import { useEffect, useState } from "react";
import { getHotels } from "./hotelService";
import { useNavigate } from "react-router-dom";


export function AvailableHotels({ filters }: { filters: GetAvailableHotelsDto }) {
  const [hotels, setHotels] = useState<HotelDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (filters.city.length > 0 && filters.start_date.length > 0 && filters.end_date.length > 0) {
      getHotels(filters).then(h => setHotels(h)).catch(console.error);
    } else {
      setHotels([]);
    }
  }, [filters]);

  return (
    <>
      {hotels.length < 1 ? (
        <p className="text-gray-500 italic">Brak wyników wyszukiwania.</p>
      ) :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {hotels.map((hotel) => (
            <div
              onClick={() => navigate(`/hotelDetails/${hotel.id}`)}
              key={hotel.id}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-900">{hotel.name}</h3>
              <p className="text-gray-700">
                {hotel.street} {hotel.number}, {hotel.postal_code}
              </p>
              <p className="text-gray-700">
                {hotel.city}, {hotel.country}
              </p>
            </div>
          ))}
        </div>}
    </>
  )
}
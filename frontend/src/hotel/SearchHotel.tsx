import { useState } from "react";
import { AvailableHotels } from "./AvailableHotels";
import { SearchHotelBar } from "./SearchHotelBar";
import { GetAvailableHotelsDto } from "@shared/dtos/hotelDto";

export function SearchHotel() {
  const [selectedFilters, setSelectedFilters] = useState<GetAvailableHotelsDto>({ city: "", end_date: "", start_date: "", capacity: 0 });
  return (
    <div className="flex flex-col w-full h-full mx-6 gap-6 mb-16">
      <h3>Wyszukaj dogodny termin oraz lokalizację: </h3>
      <SearchHotelBar onSelectFilters={setSelectedFilters} />
      <AvailableHotels filters={selectedFilters} />
    </div>
  );
}
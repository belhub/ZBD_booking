import { SearchHotelBar } from "./SearchHotelBar";

export function SearchHotel() {
  return (
    <div className="flex flex-col w-full h-full mx-6">
      <h3>Wyszukaj dogodny termin oraz lokalizację: </h3>
      <SearchHotelBar />

    </div>
  );
}
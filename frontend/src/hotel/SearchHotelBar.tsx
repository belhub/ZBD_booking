import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetAvailableHotelsDto } from "@shared/dtos/hotelDto";
import { useState } from "react";

export function SearchHotelBar({ onSelectFilters }: SearchHotelBarProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState<number>(2);
  // todo: strat_date musi być mniejsze od end_date
  // todo: wyświetlenie komunikatu o niewypełnionym polu - lista dostępnych miast

  return (
    <div className="flex">
      <Card className="w-full max-w-4xl p-6 shadow-lg rounded-2xl bg-white">
        <CardContent>
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="start-date" className="block mb-2">Data rozpoczęcia</Label>
              <Input id="start-date" type="date" className="w-full" onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="end-date" className="block mb-2">Data zakończenia</Label>
              <Input id="end-date" type="date" className="w-full" onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="city" className="block mb-2">Miasto</Label>
              <Input id="city" type="text" placeholder="Wpisz miasto" className="w-full" onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="guests" className="block mb-2">Liczba osób</Label>
              <Input id="guests" type="number" placeholder="Wpisz liczbę osób" className="w-full" onChange={(e) => setGuests(e.target.valueAsNumber)} />
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={() => onSelectFilters({ start_date: startDate, end_date: endDate, city, guests })}>Szukaj</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

type SearchHotelBarProps = {
  onSelectFilters: (filters: GetAvailableHotelsDto) => void;
};
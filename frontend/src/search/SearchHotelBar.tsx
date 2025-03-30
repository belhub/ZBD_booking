import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SearchHotelBar() {


  return (
    <div className="flex">
      <Card className="w-full max-w-4xl p-6 shadow-lg rounded-2xl bg-white">
        <CardContent>
          <div className="flex space-x-4">
            <div>
              <Label htmlFor="start-date" className="block mb-2">Data rozpoczęcia</Label>
              <Input id="start-date" type="date" className="w-full" />
            </div>
            <div>
              <Label htmlFor="end-date" className="block mb-2">Data zakończenia</Label>
              <Input id="end-date" type="date" className="w-full" />
            </div>
            <div>
              <Label htmlFor="city" className="block mb-2">Miasto</Label>
              <Input id="city" type="text" placeholder="Wpisz miasto" className="w-full" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Szukaj</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
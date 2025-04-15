import { CreateHotelDto } from "@shared/dtos/hotelDto";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createHotelWithAddress } from "./hotelService";

export function CreateHotel() {
  const epmtyForm: CreateHotelDto = {
    name: "",
    street: "",
    number: null as unknown as number,
    postal_code: "",
    city: "",
    country: ""
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<CreateHotelDto>(epmtyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("Wszystkie pola muszą zostać uzupełnione!");
      return;
    }
    setErrorMessage("");
    try {
      await createHotelWithAddress(formData);
      alert("Hotel został pomyślnie utworzony!");
      setFormData(epmtyForm)
    } catch (error) {
      setErrorMessage("Błąd podczas tworzenia hotelu. Spróbuj ponownie.");
    }
    console.log("Form data:", formData);
  };

  const validateForm = () => {
    return (
      formData.name !== "" &&
      formData.street !== "" &&
      formData.number !== null &&
      formData.postal_code !== "" &&
      formData.city !== "" &&
      formData.country !== ""
    );
  };

  return (
    <>
      <h3>Dodaj swój hotel </h3>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-6 bg-white rounded-2xl shadow-md">
        <div>
          <Label className="mb-2" htmlFor="name">Nazwa hotelu</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2" htmlFor="street">Ulica</Label>
          <Input id="street" name="street" value={formData.street} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2" htmlFor="number">Numer</Label>
            <Input id="number" type="number" name="number" value={formData.number ?? ""} onChange={handleChange} />
          </div>

          <div>
            <Label className="mb-2" htmlFor="postal_code">Kod pocztowy</Label>
            <Input id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange} />
          </div>
        </div>

        <div>
          <Label className="mb-2" htmlFor="city">Miasto</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2" htmlFor="country">Kraj</Label>
          <Input id="country" name="country" value={formData.country} onChange={handleChange} />
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <Button type="submit" className="w-full mt-4">
          Zapisz
        </Button>
      </form>
    </>
  );
}
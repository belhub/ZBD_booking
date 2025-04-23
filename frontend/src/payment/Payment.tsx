import { AddPaymentDto } from "@shared/dtos/hotelDto";
import { createPayment } from "./paymentService";

export const Payment = () => {
  const getFromLocalStorage = () => {
    const stored = localStorage.getItem("payments");
    return stored ? JSON.parse(stored) : [];
  }

  const removeFromLocalStorage = (idToRemove: number) => {
    const stored = localStorage.getItem("payments");
    if (!stored) return;

    const data = JSON.parse(stored);
    const updated = data.filter((item: AddPaymentDto) => item.reservationId !== idToRemove);
    console.log(data)
    console.log(updated)

    localStorage.setItem("payments", JSON.stringify(updated));
  }

  const handlePayment = async () => {
    let storedPayments: AddPaymentDto[] = [];
    try {
      storedPayments = getFromLocalStorage();
      await createPayment(storedPayments);
    } catch (error) {
      console.log(error);
    } finally {
      storedPayments.map(p => removeFromLocalStorage(p.reservationId));
    }
  }

  return (
    <>
      <h2>Payments</h2>
      <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => handlePayment()}>
        Zapłać za rezerwacje!
      </button>
    </>
  )
}
import { useParams } from "react-router-dom";

export function HotelDetails() {
  const { id } = useParams();
  return (
    <h3>{id} Hotel Details</h3>
  )
}
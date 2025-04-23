import { AddPaymentDto, CreateReservationDto, CreateReservationResponseDto, HotelDetailsDto } from "@shared/dtos/hotelDto";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReservation, getHotelDetails } from "./hotelService";

export function HotelDetails() {
  const [hotel, setHotel] = useState<HotelDetailsDto | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const { id, start_date, end_date, roomIds } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hotel) {
      const roomIdsDto = roomIds?.split(',') || [];
      id && getHotelDetails(id, roomIdsDto).then(h => setHotel(h)).catch(console.error);
    }
  }, []);

  const handleCheckboxChange = (roomId: number) => {
    setSelectedRooms((prevSelected) => {
      if (prevSelected.includes(roomId)) {
        return prevSelected.filter((id) => id !== roomId);
      } else {
        return [...prevSelected, roomId];
      }
    }
    );
  };

  const addToLocalStorage = (item: AddPaymentDto,) => {
    const stored = localStorage.getItem("payments");
    const data = stored ? JSON.parse(stored) : [];
    const alreadyExists = data.some((existingItem: AddPaymentDto) => existingItem.reservationId === item.reservationId);

    if (!alreadyExists) {
      data.push(item);
      localStorage.setItem("payments", JSON.stringify(data));
    }
  }


  const handleReservationCreate = async () => {
    if (start_date && end_date) {
      let reservationIds: CreateReservationResponseDto[] = [];
      try {
        const createReservationDto: CreateReservationDto = {
          userId: 2,
          roomIds: selectedRooms,
          start_date: start_date,
          end_date: end_date
        }
        reservationIds = await createReservation(createReservationDto);
      } catch (error) {
        console.log(error);
      } finally {
        if (reservationIds.length > 0) {
          reservationIds.map(id => addToLocalStorage({
            reservationId: id.reservationId,
            status: "payed",
            value: hotel?.rooms.find(r => r.id === id.roomId)?.price
          }));
          navigate(`/payment`);
        }
      }
    }
  }

  if (hotel === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-full">
        <div className="flex justify-between">
          <h2>Szczegóły hotelu {hotel.name}</h2>
          <div className="flex justify-end flex-col text-2xl">
            <span> {hotel.street} {hotel.number} </span>
            <span> {hotel.postal_code} {hotel.city} {hotel.country}</span>
          </div>
        </div>
        <div className="overflow-auto h-full pb-12">
          {hotel.rooms.sort((a, b) => a.capacity - b.capacity).map((room, index) => (
            <div key={index} className="bg-whiteborder-1 shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Pokój {index + 1}</h3>
                <p><span className="font-medium">Pojemność:</span> {room.capacity} os.</p>
                <p><span className="font-medium">Cena:</span> {room.price} zł / noc</p>
                <p><span className="font-medium">Opis:</span> {room.description}</p>
              </div>
              <div>
                <input
                  type="checkbox"
                  id={`room - ${room.id}`}
                  checked={selectedRooms.includes(room.id)}
                  onChange={() => handleCheckboxChange(room.id)}
                  className="mr-2"
                />
                <label htmlFor={`room - ${room.id}`} className="text-gray-600">
                  Wybierz pokój
                </label>
              </div>
            </div>
          ))}
          <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={() => handleReservationCreate()}>
            Rezerwuj!
          </button>
        </div>
      </div>
    </>
  )
}

// const NoHotelData = () => {
//   return (
//     <>
//       <h3 className="text-red-800 m-4">Brak danych do wyświetlenia, błąd pobierania danych</h3>
//     </>
//   )
// }

// const ShowHotelDetials = (hotel: HotelDetailsDto) => {
//   return (
//     <>
//       <div className="overflow-auto h-full">
//         <div className="flex justify-between">
//           <h2>Szczegóły hotelu {hotel.name}</h2>
//           <div className="flex justify-end flex-col text-2xl">
//             <span> {hotel.street} {hotel.number} </span>
//             <span> {hotel.postal_code} {hotel.city} {hotel.country}</span>
//           </div>
//         </div>
//         <div className=" overflow-auto h-full">
//           {hotel.rooms.sort((a, b) => a.capacity - b.capacity).map((r, index) => {
//             return ShowHotelRooms(r, index);
//           })}
//         </div>
//       </div>
//     </>
//   )
// }

// const ShowHotelRooms = (room: RoomDto, index: number) => {


//   return (
//     <div key={index} className="bg-whiteborder-1 shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 mb-4 flex justify-between items-center">
//       <div>
//         <h3 className="text-lg font-semibold text-blue-900 mb-2">Pokój {index + 1}</h3>
//         <p><span className="font-medium">Pojemność:</span> {room.capacity} os.</p>
//         <p><span className="font-medium">Cena:</span> {room.price} zł / noc</p>
//         <p><span className="font-medium">Opis:</span> {room.description}</p>
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           id={`room - ${ room.id }`}
//           checked={selectedRooms.includes(room.id)}
//           onChange={() => handleCheckboxChange(room.id)}
//           className="mr-2"
//         />
//         <label htmlFor={`room - ${ room.id }`} className="text-gray-600">
//           Wybierz pokój
//         </label>

//       </div>
//     </div>
//   )
// }
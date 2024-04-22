import React, { useState } from 'react';
import './Grid.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

export const Grid = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [rooms, setRooms] = useState(Array(location.state?.noofrooms || 0).fill(false)); 
  const [selected, setSelected] = useState(false);
  const [room, setRoom] = useState(0);
  
  const toggleBookingStatus = (index) => {
    if (!selected) { 
      const newRooms = [...rooms];
      newRooms[index] = !newRooms[index];
      setRooms(newRooms);
      setRoom(index + 1);
      setSelected(true);
    }
  };
  
  const handlebook = () => {
    console.log(room)
    navigateTo('/book-room',{state: { roomNo: room }}); 
  };

  return (
    <div>
      <h2>Snatosh Hostel</h2>
      <h3>Akurdi</h3>
      <div className="grid-container">
    
        {rooms.map((isBooked, index) => (
          <div
            key={index}
            className={`grid-cell ${isBooked ? 'booked' : 'not-booked'}`}
            onClick={() => toggleBookingStatus(index)}
          >
            Room {index + 1}
          </div>
        ))}
        <button onClick={handlebook}>Go to Booking page</button>
      </div>
     
      {selected && (
        <div className="select">
          Selected Room: {room}
        </div>
      )}
    </div>
  );
};
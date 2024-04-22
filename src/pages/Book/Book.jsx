// Book.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import './Book.css';
import { useAuth } from '../../AuthContext';
import { auth, database } from '../../../Firebase/';
import { ref, set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; 
import { Grid } from '../../components/Grid/Grid';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';

import ReceiptPdf from '../../components/ReceiptPedief/ReceiptPdf'; 

export const Book = () => {
  const navigateTo = useNavigate(); // Initialize useHistory
  const location = useLocation();
  const { currentUser } = useAuth(); 
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(null);
  const [sortOrder, setSortOrder] = useState('lowToHigh'); // Default sorting order

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = (await axios.get('http://localhost:5000/api/rooms/getrooms')).data.rooms;
        setRooms(roomsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      
    };
  }, []);

  const sortRooms = (order) => {
    const sortedRooms = [...rooms];
    sortedRooms.sort((a, b) => {
      if (order === 'lowToHigh') {
        return a.rent - b.rent;
      } else {
        return b.rent - a.rent;
      }
    });
    setRooms(sortedRooms);
    setSortOrder(order);
  };

  const handleBookNow = async (roomId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/book/${roomId}`, { userId: currentUser.uid, roomNo: location.state?.roomNo });
  
      if (response.status === 200) {
        console.log('Popup should be visible now');
        setPopupVisible(true);
        const updatedRoom = response.data.room;
        setBookedRoom(updatedRoom);
  
        const userRef = ref(database, 'users/' + currentUser.uid);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            const updatedUserData = {
              ...userData,
              bookedRoomId: roomId,
            };
            set(userRef, updatedUserData);
          } else {
            console.log('User data not found');
          }
        }).catch((error) => {
          console.error('Error fetching user data:', error);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVacancyStatusClick = (roomNoOfRooms) => {
    console.log(roomNoOfRooms)
    navigateTo('/grid',{state: { noofrooms: roomNoOfRooms }}); // Pass room.noofrooms to the '/grid' route
  };

  return (
    <div>
      <div className="sort-buttons">
        <button onClick={() => sortRooms('lowToHigh')}>Sort by Price (Low to High)</button>
        <button onClick={() => sortRooms('highToLow')}>Sort by Price (High to Low)</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {rooms.map(room => (
            <div key={room._id} className='room'>
              <div className="image">
                <img
                  src={`data:${room.homeImage.contentType};base64,${Buffer.from(room.homeImage.data).toString('base64')}`}
                  alt="Room Image"
                />
              </div>
              <div className="description1">
                <div className="title"><h2>{room.name}</h2></div>
                <div className="des"><p>{room.description}</p></div>
                <div className="type"><h3>Type: {room.type}</h3></div>
                <div className="rentbutt">
                  <div className="rent"><h3>₹{room.rent}</h3></div>
                  <div className="buttons">
                    <button className='bookbutton' onClick={() => handleBookNow(room._id)}>Book Now</button>
                    <button className='vacancybutton'  onClick={() => handleVacancyStatusClick(room.noofRooms)}>Vacancy Status</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {popupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Room Booked Successfully!</h2>
            <p>You have successfully booked {bookedRoom.name}.</p>
            <PDFDownloadLink document={<ReceiptPdf bookedRoom={bookedRoom} />} fileName="receipt.pdf">
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Receipt')}
            </PDFDownloadLink>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

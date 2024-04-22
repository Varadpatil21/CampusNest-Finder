

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from  '../../AuthContext'
import { Buffer } from 'buffer';

export const MyRoom1 = () => {
    const { currentUser } = useAuth(); 
    const userId=currentUser.uid;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`http://localhost:5000/api/rooms/user/${userId}`);
        setRooms(response.data);
        
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [userId]);

  return (
    <div>
     
      <ul>
        {rooms.map(roomDetails => (
          <li key={roomDetails._id}>
              <div key={roomDetails._id} className='room'>
              <div className="image">
                <img
                  src={`data:${roomDetails.homeImage.contentType};base64,${Buffer.from(roomDetails.homeImage.data).toString('base64')}`}
                  alt="Room Image"
                />
              </div>
              <div className="description1">
                <div className="title"><h2>{roomDetails.name}</h2></div>
                <div className="des"><p>{roomDetails.description}</p></div>
                <div className="type"><h3>Type: {roomDetails.type}</h3></div>
                <div className="rentbutt">
                  <div className="rent"><h3>₹{roomDetails.rent}</h3></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};



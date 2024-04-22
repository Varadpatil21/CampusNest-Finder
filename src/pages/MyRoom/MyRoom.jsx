import React, { useState, useEffect } from 'react';
import { database } from '../../../Firebase/';
import { ref, get } from 'firebase/database';
import axios from 'axios';
import { useAuth } from  '../../AuthContext'
import { Buffer } from 'buffer';
export const MyRoom = () => {
    const { currentUser } = useAuth(); 
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    // Fetch room ID from Firebase
    const userRef = ref(database, 'users/' + currentUser.uid);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const roomId = userData.bookedRoomId; 
        console.log(roomId)
        axios.get(`http://localhost:5000/api/rooms/${roomId}`).then((response) => {
          const roomData = response.data;
          setRoomDetails(roomData);
        }).catch((error) => {
          console.error('Error fetching room details:', error);
        });
      } else {
        console.log('User data not found');
      }
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []); // Make sure to include dependencies if needed

  return (
    <div>
      {roomDetails ? (
        <div>
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
        </div>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
};

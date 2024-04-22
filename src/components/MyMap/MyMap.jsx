import React,{useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./MyMap.css"
import axios from 'axios';
import { useState } from 'react';

export const MyMap = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms/getrooms');
                setRooms(response.data.rooms);
                console.log(response.data.rooms)
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);
    return (
        <MapContainer center={[18.651674, 73.761536]} zoom={15} className='map-container'>
            <TileLayer
                attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
             {rooms.map(room => (
                <Marker key={room._id} position={[room.latitude, room.longitude]}>
                    <Popup>
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

import { useState } from 'react';
import React from 'react';
import './AddRoom.css';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { CiLocationOn } from "react-icons/ci";
export const AddRoom = () => {
    const { currentUser } = useAuth(); // Access the authenticated user from the AuthContext
    const [name, setName] = useState('');
    const [noofRooms, setNoOfRooms] = useState('');
    const [rent, setRent] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [homeImage, setHomeImage] = useState(null);
    const [latitude, setLatitude] = useState(null); // State for latitude
    const [longitude, setLongitude] = useState(null); // State for longitude
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const featureOptions = ['Attached Washroom', 'AC', 'Wifi', 'RO', 'GYM'];
    const addRoom = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('noofRooms', noofRooms);
        formData.append('rent', rent);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('homeImage', homeImage);
        formData.append('ID', currentUser.uid); // Add the owner's ID to the formData

        // Add latitude and longitude to formData
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('features', JSON.stringify(selectedFeatures));

        try {
            const response = await axios.post('http://localhost:5000/api/rooms/addroom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
       
    };
    const handleFeatureSelection = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedFeatures([...selectedFeatures, value]);
        } else {
            setSelectedFeatures(selectedFeatures.filter((feature) => feature !== value));
        }
    };

    return (
        <div className='room-container'>
            <form action=''>
                <h2>Add Room</h2>
                <div className='input'>
                    <input type='text' name='PGname' placeholder='PG Name' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='number' name='noOfRooms' placeholder='Room Count' onChange={(e) => setNoOfRooms(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='number' name='rent' placeholder='Rent' onChange={(e) => setRent(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='text' name='type' placeholder='Type' onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='text' name='description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='input1'>
                    <label htmlFor='myfile'>Select a Home Image:</label>
                    <input type='file' id='myfile' name='myfile' onChange={(e) => setHomeImage(e.target.files[0])} required />
                </div>
                <label className="label">Select Features:</label>
                <div className="checkbox-container">
                    {featureOptions.map((option, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={option}
                                name="features"
                                value={option}
                                checked={selectedFeatures.includes(option)}
                                onChange={handleFeatureSelection}
                            />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}</div>
                <div className='location'>
                <button type='button' className='get-location' onClick={getLocation}>Get My Current Location</button>
                <CiLocationOn className='myclass' /> 
                </div>
                <button type='submit' className='submit' onClick={addRoom}>Add Room</button>
            </form>
        </div>
    );
};

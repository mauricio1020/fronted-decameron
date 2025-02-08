import React from 'react';
import HotelList from '../components/HotelList';
import HotelForm from '../components/HotelForm';

const Hotels = () => {
    return (
        <div>
            <h1>Gestión de Hoteles</h1>
            <hr />
            <HotelList />
        </div>
    );
};

export default Hotels;
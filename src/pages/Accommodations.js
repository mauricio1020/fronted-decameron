import React from 'react';
import AccommodationList from '../components/AccommodationList';
import AccommodationForm from '../components/AccommodationForm';

const Accommodations = () => {
    return (
        <div>
            <h1>Gestión de Acomodaciones</h1>

            <hr />
            <AccommodationList />
        </div>
    );
};

export default Accommodations;
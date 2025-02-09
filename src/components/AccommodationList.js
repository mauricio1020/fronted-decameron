import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccommodationForm from './AccommodationForm';

const AccommodationList = () => {
    const [accommodations, setAccommodations] = useState([]);

    // Función para cargar las acomodaciones
    const fetchAccommodations = async () => {
        try {
            const response = await axios.get('https://backend-decameron-production.up.railway.app/api/accommodations');
            setAccommodations(response.data);
        } catch (error) {
            console.error('Error fetching accommodations:', error);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchAccommodations();
    }, []);

    return (
        <div className="container mt-5">

            {/* Formulario para crear nuevas acomodaciones */}
            <AccommodationForm onAccommodationCreated={fetchAccommodations}/>
            <hr/>
            <h2 className="text-center mb-4">Lista de Acomodaciones</h2>

            {/* Tabla de acomodaciones */}
            <table className="table table-bordered table-hover">
                <thead className="table-primary">
                <tr>
                    <th>Hotel</th>
                    <th>Tipo de Habitación</th>
                    <th>Acomodación</th>
                    <th>Cantidad</th>
                </tr>
                </thead>
                <tbody>
                {accommodations.map((accommodation) => (
                    <tr key={accommodation.id}>
                        <td>{accommodation.hotel?.name || 'N/A'}</td>
                        <td>{accommodation.room_type?.name || 'N/A'}</td>
                        <td>{accommodation.type}</td>
                        <td>{accommodation.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default AccommodationList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelForm from './HotelForm';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);

    // Función para cargar los hoteles
    const fetchHotels = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/hotels');
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchHotels();
    }, []);

    return (
        <div className="container mt-2">
            {/* Formulario para crear nuevos hoteles */}
            <HotelForm onHotelCreated={fetchHotels}/>
            <hr/>
            <h2 className="text-center mb-4">Lista de Hoteles</h2>

            {/* Tabla de hoteles */}
            <table className="table table-bordered table-hover">
                <thead className="table-primary">
                <tr>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>NIT</th>
                    <th>Habitaciones</th>
                </tr>
                </thead>
                <tbody>
                {hotels.map((hotel) => (
                    <tr key={hotel.id}>
                        <td>{hotel.name}</td>
                        <td>{hotel.address}</td>
                        <td>{hotel.city}</td>
                        <td>{hotel.nit}</td>
                        <td>{hotel.number_of_rooms}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HotelList;
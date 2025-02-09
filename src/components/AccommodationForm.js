import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccommodationForm = ({ onAccommodationCreated }) => {
    const [accommodation, setAccommodation] = useState({
        hotel_id: '',
        room_type_id: '',
        type: '',
        quantity: '',
    });
    const [hotels, setHotels] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);

    // Cargar hoteles y tipos de habitación
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const hotelsResponse = await axios.get('backend-decameron-production.up.railway.app/api/hotels');
                const roomTypesResponse = await axios.get('backend-decameron-production.up.railway.app/api/room-types');
                setHotels(hotelsResponse.data);
                setRoomTypes(roomTypesResponse.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    // Validar que el valor sea un número positivo
    const handlePositiveNumberChange = (e, field) => {
        const value = e.target.value;

        // Permitir solo números positivos (incluyendo vacío para limpiar el campo)
        if (/^\d*$/.test(value)) {
            setAccommodation({ ...accommodation, [field]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que la cantidad no sea negativa ni vacía
        if (accommodation.quantity <= 0 || accommodation.quantity === '') {
            alert('La cantidad debe ser un número positivo mayor a cero.');
            return;
        }

        try {
            await axios.post('backend-decameron-production.up.railway.app/api/accommodations', accommodation);
            alert('Acomodación creada exitosamente');
            setAccommodation({ hotel_id: '', room_type_id: '', type: '', quantity: '' });

            // Refrescar los datos después de guardar
            if (onAccommodationCreated) {
                onAccommodationCreated();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;

                // Construir un mensaje de error detallado
                let errorMessage = 'Errores de validación:\n';
                for (const field in errors) {
                    errors[field].forEach((message) => {
                        errorMessage += `- ${message}\n`;
                    });
                }

                alert(errorMessage);
            } else {
                console.error('Error creating accommodation:', error);
                alert('Hubo un error al crear la acomodación');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Registrar Nueva Acomodación</h2>
            <form onSubmit={handleSubmit} className="row g-3">
                {/* Hotel */}
                <div className="col-md-6">
                    <label htmlFor="hotel" className="form-label">
                        Hotel:
                    </label>
                    <select
                        id="hotel"
                        value={accommodation.hotel_id}
                        onChange={(e) => setAccommodation({ ...accommodation, hotel_id: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Selecciona un hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tipo de Habitación */}
                <div className="col-md-6">
                    <label htmlFor="roomType" className="form-label">
                        Tipo de Habitación:
                    </label>
                    <select
                        id="roomType"
                        value={accommodation.room_type_id}
                        onChange={(e) => setAccommodation({ ...accommodation, room_type_id: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Selecciona un tipo de habitación</option>
                        {roomTypes.map((roomType) => (
                            <option key={roomType.id} value={roomType.id}>
                                {roomType.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tipo de Acomodación */}
                <div className="col-md-6">
                    <label htmlFor="type" className="form-label">
                        Acomodación:
                    </label>
                    <select
                        id="type"
                        value={accommodation.type}
                        onChange={(e) => setAccommodation({ ...accommodation, type: e.target.value })}
                        className="form-select"
                        required
                    >
                        <option value="">Selecciona una acomodación</option>
                        {accommodation.room_type_id === '1' && (
                            <>
                                <option value="Sencilla">Sencilla</option>
                                <option value="Doble">Doble</option>
                            </>
                        )}
                        {accommodation.room_type_id === '2' && (
                            <>
                                <option value="Triple">Triple</option>
                                <option value="Cuádruple">Cuádruple</option>
                            </>
                        )}
                        {accommodation.room_type_id === '3' && (
                            <>
                                <option value="Sencilla">Sencilla</option>
                                <option value="Doble">Doble</option>
                                <option value="Triple">Triple</option>
                            </>
                        )}
                    </select>
                </div>

                {/* Cantidad */}
                <div className="col-md-6">
                    <label htmlFor="quantity" className="form-label">
                        Cantidad:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={accommodation.quantity}
                        onChange={(e) => handlePositiveNumberChange(e, 'quantity')}
                        className="form-control"
                        min="1" // Asegura que el valor mínimo sea 1
                        required
                    />
                </div>

                {/* Botón de Guardar */}
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccommodationForm;
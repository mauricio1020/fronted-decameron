import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const HotelForm = ({ onHotelCreated }) => {
    const [hotel, setHotel] = useState({
        name: '',
        address: '',
        city: '',
        nit: '',
        number_of_rooms: '',
    });
    const [errors, setErrors] = useState({});

    // Validaciones del formulario
    const validateFields = () => {
        const newErrors = {};
        if (!/^[a-zA-Z\s]+$/.test(hotel.name)) newErrors.name = 'El nombre solo debe contener letras.';
        if (!/^[a-zA-Z\s]+$/.test(hotel.city)) newErrors.city = 'La ciudad solo debe contener letras.';
        if (!/^\d{8}-\d$/.test(hotel.nit)) newErrors.nit = 'El NIT debe tener el formato: 12345678-9.';
        if (!/^\d+$/.test(hotel.number_of_rooms) || parseInt(hotel.number_of_rooms, 10) <= 0) {
            newErrors.number_of_rooms = 'El número de habitaciones debe ser un número positivo mayor que cero.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        try {
            await axios.post('https://backend-decameron-production.up.railway.app/api/hotels', hotel);
            alert('Hotel creado exitosamente');
            setHotel({ name: '', address: '', city: '', nit: '', number_of_rooms: '' });
            setErrors({});

            // Refrescar los datos después de guardar
            if (onHotelCreated) {
                onHotelCreated();
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;

                // Construir un mensaje de error detallado
                let errorMessage = 'Errores de validación:\n';
                Object.keys(errors).forEach((field) => {
                    errorMessage += errors[field].map((message) => `- ${message}`).join('\n') + '\n';
                });

                alert(errorMessage);
            } else {
                console.error('Error creando hotel:', error);
                alert('Hubo un error al crear el hotel');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validar campos numéricos
        if (name === 'number_of_rooms') {
            if (/^\d*$/.test(value) && parseInt(value, 10) >= 0) {
                setHotel({ ...hotel, [name]: value });
            }
            return;
        }

        // Validar otros campos con expresiones regulares
        const regexMap = {
            name: /^[a-zA-Z\s]*$/,
            city: /^[a-zA-Z\s]*$/,
            nit: /^\d{0,8}-?\d?$/,
            address: /.*/, // Permitir cualquier valor para la dirección
        };

        if (regexMap[name]?.test(value) || value === '') {
            setHotel({ ...hotel, [name]: value });
        }
    };

    return (
        <div className="container mt-5">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        Hoteles Decameron
                    </a>
                </div>
            </nav>

            {/* Formulario */}
            <div className="mt-4">
                <h2 className="text-center">Registrar Nuevo Hotel</h2>
                <form onSubmit={handleSubmit} className="row g-3">
                    {/* Nombre */}
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={hotel.name}
                            onChange={handleInputChange}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Dirección */}
                    <div className="col-md-6">
                        <label htmlFor="address" className="form-label">
                            Dirección:
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={hotel.address}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Ciudad */}
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">
                            Ciudad:
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={hotel.city}
                            onChange={handleInputChange}
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>

                    {/* NIT */}
                    <div className="col-md-6">
                        <label htmlFor="nit" className="form-label">
                            NIT:
                        </label>
                        <input
                            type="text"
                            id="nit"
                            name="nit"
                            value={hotel.nit}
                            onChange={handleInputChange}
                            className={`form-control ${errors.nit ? 'is-invalid' : ''}`}
                            placeholder="Ejemplo: 12345678-9"
                            required
                        />
                        {errors.nit && <div className="invalid-feedback">{errors.nit}</div>}
                    </div>

                    {/* Número de Habitaciones */}
                    <div className="col-md-6">
                        <label htmlFor="number_of_rooms" className="form-label">
                            Número de Habitaciones:
                        </label>
                        <input
                            type="text"
                            id="number_of_rooms"
                            name="number_of_rooms"
                            value={hotel.number_of_rooms}
                            onChange={handleInputChange}
                            className={`form-control ${errors.number_of_rooms ? 'is-invalid' : ''}`}
                            required
                        />
                        {errors.number_of_rooms && (
                            <div className="invalid-feedback">{errors.number_of_rooms}</div>
                        )}
                    </div>

                    {/* Botón de Guardar */}
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

HotelForm.propTypes = {
    onHotelCreated: PropTypes.func,
};

export default HotelForm;
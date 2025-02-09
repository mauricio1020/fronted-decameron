import axios from 'axios';

// Cambia 'http://localhost:8000/api' por el dominio de Railway
const api = axios.create({
    baseURL: 'https://backend-decameron-production.up.railway.app/api', // Usa el dominio de Railway
});

// Hoteles
export const getHotels = () => api.get('/hotels');
export const createHotel = (data) => api.post('/hotels', data);

// Acomodaciones
export const getAccommodations = () => api.get('/accommodations');
export const createAccommodation = (data) => api.post('/accommodations', data);
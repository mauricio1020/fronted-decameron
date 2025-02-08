import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Asegúrate de que coincida con tu backend
});

// Hoteles
export const getHotels = () => api.get('/hotels');
export const createHotel = (data) => api.post('/hotels', data);

// Acomodaciones
export const getAccommodations = () => api.get('/accommodations');
export const createAccommodation = (data) => api.post('/accommodations', data);
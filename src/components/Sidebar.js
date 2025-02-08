// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
            <h4>Menú</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/hotels">🏨 Hoteles</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/accommodations">🛏️ Acomodaciones</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/reservations">📅 Reservas</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

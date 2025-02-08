import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', height: '100vh', minHeight: '100vh' }}>
            {/* Sidebar con altura completa */}
            <div style={{ width: '250px', background: '#1d1d1d', color: '#fff', minHeight: '100vh' }}>
                <Sidebar />
            </div>

            {/* Contenido principal */}
            <div style={{ flex: 1, padding: '20px', background: '#f8f9fa', overflowY: 'auto' }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;

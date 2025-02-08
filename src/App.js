import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Hotels from './pages/Hotels';
import Accommodations from './pages/Accommodations';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Redirige la raíz ("/") a "/hotels" */}
                    <Route path="/" element={<Navigate to="/hotels" />} />
                    <Route path="/hotels" element={<Hotels />} />
                    <Route path="/accommodations" element={<Accommodations />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

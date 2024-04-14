import React, { useState } from 'react';

const Home = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleExploreProducts = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="main-panel flex items-center justify-center">
            <div className="welcome-message p-10 pt-5 rounded-lg text-center fade-in">
                <h1 className="text-3xl font-bold mb-4">Bienvenido a MEKO Store</h1>
                <p className="text-lg text-gray-700 mb-8">Explora nuestra amplia selección de productos de alta calidad.</p>
                <button onClick={handleExploreProducts} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">Explorar productos</button>
            </div>
            {/* Mensaje emergente */}
            {showAlert && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg text-center">
                        <p className="text-lg text-gray-700 mb-4">Esta funcionalidad se añadirá más adelante.</p>
                        <button onClick={handleCloseAlert} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Aceptar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;

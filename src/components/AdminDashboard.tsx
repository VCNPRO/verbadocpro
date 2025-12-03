import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-green-500">Panel de Administración</h1>
            <p className="mt-4">Bienvenido, administrador. Esta es un área protegida.</p>
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold">Métricas del Sistema</h2>
                <p className="mt-2 text-gray-400">Las métricas y otras herramientas de administración se mostrarán aquí.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;

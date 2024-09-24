import { useState, useEffect } from 'react';
import Service from '../config/config'; // Importar la instancia de Axios

const useFetchCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCompanies, setTotalCompanies] = useState(0);

    const [contacts, setContacts] = useState([]);
    const [loadingContacts, setLoadingContacts] = useState(true);
    const [errorContacts, setErrorContacts] = useState(null);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await Service.get('/companies');
            setCompanies(response.data);
            setTotalCompanies(response.data.length);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await Service.get('/contacts');
            setContacts(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
        fetchCompanies();
    }, []);

    const createCompany = async (companiesData) => {
        try {
            const response = await Service.post('/companies', companiesData);
            await fetchCompanies();
            return response.data;
        } catch (err) {
            throw new Error(err.response.data.error);
        }
    };

    const updateCompanies = async (userData, id) => {
        try {
            const response = await Service.put(`/companies/${id}`, userData);
            await fetchCompanies();
            return response.data;
        } catch (err) {
            throw new Error(err.response.data.error);
        }
    };

    const deleteCompany = async (id) => {
        if (!id) {
            console.error('ID de la empresa es undefined o null');
            return;
        }
        try {
            const response = await Service.delete(`/companies/${id}`);
            console.log('Empresa eliminada', response.data);
            await fetchCompanies(); // Actualizar la lista después de eliminar
            return response.data;
        } catch (err) {
            console.error('Error al eliminar empresa:', err.response?.data || err.message);
            throw new Error(err.response?.data?.error || 'Error desconocido');
        }
    };


    return { companies, loading, error, totalCompanies, fetchCompanies, createCompany, deleteCompany, updateCompanies, fetchContacts };
};

export default useFetchCompanies;

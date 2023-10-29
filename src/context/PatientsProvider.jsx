import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/AxiosClient.jsx";
import useAuth from "../hooks/useAuth.jsx";

const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {

    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});

    const { auth } = useAuth();

    const savePatient = async (patient) => {

        const token = localStorage.getItem('CareTrack');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (patient.id) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config);

                const updatedPatients = patients.map(patient => patient._id === data._id ? data : patient);

                setPatients(updatedPatients);

            } catch (error) {
                console.log(error.response.data.message);
            }
        } else {
            try {
                const { data } = await axiosClient.post('/patients', patient, config);

                setPatients([data, ...patients]);
            }
            catch (error) {
                console.log(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        const getPatiens = async () => {
            const token = localStorage.getItem('CareTrack');

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient.get('/patients', config);
                setPatients(data);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        getPatiens();
    }, [auth])

    const setEdition = (patient) => {
        setPatient(patient);
    }

    const deletePatient = async (id) => {

        const confirmation = window.confirm('Are you sure you want to delete this patient?');

        const token = localStorage.getItem('CareTrack');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(confirmation){
            try {
                await axiosClient.delete(`/patients/${id}`, config);

                const newPatients = patients.filter(patient => patient._id !== id);

                setPatients(newPatients);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
    }



    return (
        <PatientsContext.Provider
            value={{
                patient,
                patients,
                savePatient,
                setEdition,
                deletePatient
            }}>
            {children}
        </PatientsContext.Provider>
    )
}

export { PatientsProvider }

export default PatientsContext;
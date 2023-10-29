import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/AxiosClient.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('CareTrack');

            if (!token) {
                setIsLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/doctors/profile', config);
                setAuth(data);
            } catch (error) {
                setAuth({});
                console.log(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }
        authUser();
    }, [])

    const logout = () => {
        localStorage.removeItem('CareTrack');
        setAuth({});
    }

    const updateProfile = async (profile) => {
        const token = localStorage.getItem('CareTrack');

        if (!token) {
            setIsLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.put(`/doctors/profile/${auth._id}`, profile, config);

            setAuth(data.updatedProfile);
            return { message: data.message }
        } catch (error) {
            return { message: error.response.data.message,
                error: true }
        }
    }

    const changePassword = async (currentPassword, newPassword) => {
        const token = localStorage.getItem('CareTrack');

        if (!token) {
            setIsLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const body = {
            currentPassword,
            newPassword
        }

        try {

            const { data } = await axiosClient.put(`/doctors/profile/change-password/${auth._id}`, body, config);

            return { message: data.message }

        } catch (error) {
            return { message: error.response.data.message,
                error: true }
        }
    }

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            isLoading,
            logout,
            updateProfile,
            changePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };

export default AuthContext;
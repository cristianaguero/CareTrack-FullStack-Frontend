import { Outlet, Navigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import useAuth from '../hooks/useAuth.jsx'

import HeaderPrivate from '../components/HeaderPrivate.jsx'
import Footer from '../components/Footer.jsx'

function PrivateLayout() {

    const { auth, isLoading } = useAuth()

    if(isLoading) return (
    <Loader />
    )

    return (
        <>
            <HeaderPrivate />
                {auth?._id 
                ? (
                    <main className='container mx-auto mt-5'>
                        <Outlet /> 
                    </main>
                )
                : <Navigate to='/' />}
            <Footer />
        </>
    )
}

export default PrivateLayout
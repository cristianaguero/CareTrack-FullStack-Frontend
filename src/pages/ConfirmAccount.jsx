import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosClient from '../config/AxiosClient.jsx'
import Alert from '../components/Alert'
import Loader from '../components/Loader.jsx'

function ConfirmAccount() {

    const params = useParams()
    const { token } = params

    const [accountConfirmed, setAccountConfirmed] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [alert, setAlert] = useState({})

    useEffect(() => {
        const ConfirmAccount = async () => {
            try {
                const url = `/doctors/confirm-account/${token}`

                const {data} = await axiosClient(url)

                setAccountConfirmed(true)

                setAlert({
                    message: data.message, 
                    error: false})

            } catch (error) {
                setAlert({
                    message: error.response.data.message, 
                    error: true})
            } finally {
                setIsLoading(false)
            }
        }

        ConfirmAccount()
    }, [])

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Confirm your account and start managing {' '}
                    <span className="text-black">your Patients</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {isLoading 
                ? <Loader /> 
                : <Alert alert={alert} />}

                {accountConfirmed && (
                    <Link className='block my-5 text-gray-500 text-center'
                        to='/'>Sign in</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmAccount
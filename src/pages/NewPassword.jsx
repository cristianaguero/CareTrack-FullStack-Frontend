import HeaderPublic from "../components/HeaderPublic"
import { useState, useEffect } from 'react'
import axiosClient from '../config/AxiosClient.jsx'
import Alert from '../components/Alert.jsx'
import Loader from '../components/Loader.jsx'
import { useParams, Link } from 'react-router-dom'



function NewPassword() {

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [alert, setAlert] = useState({})
    const [isValidToken, setIsValidToken] = useState(false)
    const [passwordChanged, setPasswordChanged] = useState(false)

    const params = useParams()
    const { token } = params

    useEffect(() => {
        async function checkToken() {

            setIsLoading(true)

            try {
                const { data } = await axiosClient.get(`/doctors/forget-password/${token}`)

                setAlert({ message: data.message, error: false })
                setIsValidToken(true)

            } catch (error) {
                setAlert({ message: error.response.data.message, error: true })
                setIsValidToken(false)
                setPasswordChanged(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkToken()

    }, [])

    async function handleNewPassword(e) {
        e.preventDefault()

        if ([password, repeatPassword].includes('')) {
            setAlert({ message: 'All fields are required', error: true })
            return
        }

        if (password !== repeatPassword) {
            setAlert({ message: 'Passwords do not match', error: true })
            return
        }

        if (password.length < 6) {
            setAlert({ message: 'Password must be at least 6 characters', error: true })
            return
        }

        setAlert({})

        setIsLoading(true)

        try {
            const { data } = await axiosClient.post(`/doctors/forget-password/${token}`, { password })

            setAlert({ message: data.message, error: false })
            setPasswordChanged(true)

            setPassword('')
            setRepeatPassword('')
        } catch (error) {
            setAlert({ message: error.response.data.message, error: true })
        } finally {
            setIsLoading(false)
        }
    }

    const { message } = alert

    return (
        <>
            <HeaderPublic text={'Reset your password and don\'t lose'} span={'your Patients'} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {isLoading 
                ? <Loader /> 
                : (message && <Alert alert={alert} />)}

                {isValidToken && (
                    <>
                        <form onSubmit={handleNewPassword}>
                            <div className="my-5">
                                <label htmlFor='password' className="uppercase text-gray-600 block text-xl font-bold">New Password</label>
                                <input
                                    id='password'
                                    type="password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    placeholder="Your New Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="my-5">
                                <label htmlFor='repeat-password' className="uppercase text-gray-600 block text-xl font-bold">Repeat New Password</label>
                                <input
                                    id='repeat-password'
                                    type="password"
                                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                    placeholder="Repeat New Password"
                                    value={repeatPassword}
                                    onChange={e => setRepeatPassword(e.target.value)} />
                            </div>

                            {isLoading 
                            ? <Loader /> 
                            : <input
                                type="submit"
                                value="Reset Password"
                                className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />}
                        </form>
                        {passwordChanged && <Link className='block my-10 text-gray-500 text-center'
                            to='/'>Sign in</Link>}
                    </>
                )}
            </div>
        </>
    )
}

export default NewPassword
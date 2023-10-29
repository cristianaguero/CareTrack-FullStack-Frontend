import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeaderPublic from '../components/HeaderPublic'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import axiosClient from '../config/AxiosClient'
import useAuth from '../hooks/useAuth'

function Login() {

    const { setAuth } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { message } = alert

    async function handleLogin(e) {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlert({ message: 'All fields are required', error: true })
            return
        }

        setAlert({})
        setIsLoading(true)

        try {

            const { data } = await axiosClient.post('/doctors/login', { email, password })

            localStorage.setItem('CareTrack', data.token)

            setEmail('')
            setPassword('')

            setAuth(data)

            navigate('/admin')

        } catch (error) {
            setAlert({ message: error.response.data.message, error: true })
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <>
            <HeaderPublic text={'Sign in and manage your'} span={'Patients'} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {message && <Alert alert={alert} />}

                <form onSubmit={handleLogin}> 
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Registration Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Your Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    {isLoading 
                    ? <Loader /> 
                    : <input type="submit"
                        value="Sign in"
                        className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />}

                    
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className='block my-5 text-gray-500 text-center'
                        to='/register'>Don't have an account? Sign up</Link>
                    <Link className='block my-5 text-gray-500 text-center'
                        to='/forget-password'>I forgot my password</Link>
                </nav>

            </div>

        </>
    )
}

export default Login
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../config/AxiosClient.jsx'
import Alert from '../components/Alert.jsx'
import Loader from '../components/Loader.jsx'
import HeaderPublic from '../components/HeaderPublic.jsx'

function Register() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [alert, setAlert] = useState({})

    async function handleRegister(e) {
        e.preventDefault()

        

        if([name, email, password, repeatPassword].includes('')) {
            setAlert({message: 'All fields are required', error: true})
            return 
        }

        if (password !== repeatPassword) {
            setAlert({message: 'Passwords do not match', error: true})
            return 
        }

        if(password.length < 6) {
            setAlert({message: 'Password must be at least 6 characters', error: true})
            return 
            
        }

        setAlert({})
        setIsLoading(true)

        try{
            const { data } = await axiosClient.post('/doctors/register', {name, surname, email, password})

            setAlert({message: data.message, error: false})

            setName('')
            setSurname('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')

        } catch (error) {
            setAlert({message: error.response.data.message, error: true})
        } finally {
            setIsLoading(false)
        }

    }

    const { message } = alert

    return (
        <>
            <HeaderPublic text={'Sign up and manage your'} span={'Patients'} />

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {message && <Alert alert={alert} />}
                <form onSubmit={handleRegister}>
                    <div className="my-5">
                        <label htmlFor='name' className="uppercase text-gray-600 block text-xl font-bold">Name</label>
                        <input
                            id='name'
                            type="text"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Your name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label htmlFor='surname' className="uppercase text-gray-600 block text-xl font-bold">Surame</label>
                        <input
                            id='surname'
                            type="text"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Your name"
                            value={surname}
                            onChange={e => setSurname(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label htmlFor='email' className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            id='email'
                            type="email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label htmlFor='password' className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input
                            id='password'
                            type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Your Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label htmlFor='repeat-password' className="uppercase text-gray-600 block text-xl font-bold">Repeat Password</label>
                        <input
                            id='repeat-password'
                            type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Repeat Password"
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)} />
                    </div>

                    {isLoading ? <Loader /> : <input
                        type="submit"
                        value="Sign up"
                        className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />}
                </form>

                <nav className="mt-10 lg:flex lg:justify-between text-center">
                    <Link className='block my-5 text-gray-500'
                        to='/'>Already have an account? Sign in</Link>
                    <Link className='block my-5 text-gray-500'
                        to='/forget-password'>I forgot my password</Link>
                </nav>
            </div>
        </>
    )
}

export default Register
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../config/AxiosClient.jsx'
import Alert from '../components/Alert.jsx'
import Loader from '../components/Loader.jsx'


function ForgetPassword() {

    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    async function handleResetPassword(e) {
        e.preventDefault()

        if (email === '') {
            setAlert({ message: 'Email is required', error: true })
            return
        }

        setAlert({})
        setIsLoading(true)

        try {
            const { data } = await axiosClient.post('/doctors/forget-password', { email })


            setAlert({ message: data.message, error: false })

            setEmail('')

        } catch (error) {
            setAlert({ message: error.response.data.message, error: true })
        } finally {
            setIsLoading(false)
        }
    }

    const { message } = alert

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recover your access and don't lose {' '}
                    <span className="text-black">your Patients</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {message && <Alert alert={alert} />}
                <form onSubmit={handleResetPassword}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Registration Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    {isLoading
                        ? <Loader />
                        : <input type="submit"
                            value="Send Instructions"
                            className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />}
                </form>

                <nav className="mt-10 lg:flex lg:justify-between text-center">
                    <Link className='block my-5 text-gray-500 text-center'
                        to='/'>Already have an account? Sign in</Link>
                    <Link className='block my-5 text-gray-500 text-center'
                        to='/register'>Don't have an account? Sign up</Link>
                </nav>
            </div>
        </>
    )
}

export default ForgetPassword
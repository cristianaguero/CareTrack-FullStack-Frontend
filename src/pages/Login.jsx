import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Sign in and manage your {' '}
                    <span className="text-black">Patients</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                <form>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input type="email"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Registration Email" />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input type="password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            placeholder="Your Password" />
                    </div>

                    <input type="submit"
                        value="Sign in"
                        className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
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
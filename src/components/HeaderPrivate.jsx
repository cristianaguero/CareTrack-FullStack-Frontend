import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth.jsx'

function HeaderPrivate() {

    const { logout } = useAuth()

    return (
        <header className="py-5 px-7 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <Link to='/admin' className="text-lg text-white  text-center"> <p className="text-white font-bold text-2xl  inline">CareTrack</p>{' '}
                    <p className='hidden md:inline'>
                    - Seamless Care Coordination for {''}
                    <span className='text-indigo-200'>
                        Better Wellness
                    </span>
                    </p>
                </Link>

                <nav className='flex flex-col items-center lg:flex-row mt-5 lg:mt-0 gap-4'>
                    <Link to='/admin' className="text-white text-sm uppercase font-bold">Home</Link>

                    <Link to='/admin/patients' className="text-white text-sm uppercase font-bold">Patients</Link>

                    <Link to='/admin/profile' className="text-white text-sm uppercase font-bold">Profile</Link>

                    <button
                        className="text-red-400 text-sm uppercase font-bold lg:ml-10"
                        onClick={logout}
                    >
                        Sign Out
                    </button>

                </nav>
            </div>


        </header>
    )
}

export default HeaderPrivate
import { Link } from 'react-router-dom'
function EditNav() {
    return (
        <nav className='mx-10 flex gap-10'>
            <Link className='font-bold uppercase text-gray-500' to="/admin/profile">Profile</Link>
            <Link className='font-bold uppercase text-gray-500' to="/admin/profile/change-password">Change Password</Link>
        </nav>
    )
}

export default EditNav
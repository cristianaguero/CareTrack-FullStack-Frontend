import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <>
            <h1>AuthLayout</h1>

            <Outlet />
        </>
    )
}

export default AuthLayout
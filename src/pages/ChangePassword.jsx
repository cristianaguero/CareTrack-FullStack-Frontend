import EditNav from "../components/EditNav"
import useAuth from "../hooks/useAuth"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import { useState } from "react"

function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [alert, setAlert] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { changePassword } = useAuth()

    const handleChangePassword = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        if ([currentPassword, newPassword, repeatNewPassword].includes('')) {
            setAlert({
                message: 'All fields are required',
                error: true
            })
            setIsLoading(false)
            return
        }

        if (newPassword !== repeatNewPassword) {
            setAlert({
                message: 'Passwords do not match',
                error: true
            })
            setIsLoading(false)
            return
        }

        if (newPassword.length < 6) {
            setAlert({
                message: 'Password must be at least 6 characters long',
                error: true
            })
            setIsLoading(false)
            return
        }


        const response = await changePassword(currentPassword, newPassword)

        setAlert(response)

        setCurrentPassword('')
        setNewPassword('')
        setRepeatNewPassword('')


        setIsLoading(false)

    }

    const { message } = alert

    return (
        <>
            <EditNav />

            <h2 className="font-black text-3xl text-center mt-5">Change Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">Change your {' '} <span className="text-indigo-600 font-bold">Password here</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {message && <Alert alert={alert} />}

                    <form onSubmit={handleChangePassword}>
                        <div className="my-3">
                            <label htmlFor="current-password" className="uppecase font-bold text-gray-600 ">Current Password</label>
                            <input
                                type="password"
                                id="current-password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Write your current password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="my-3">
                            <label htmlFor="new-password" className="uppecase font-bold text-gray-600 ">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Write your new password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div className="my-3">
                            <label htmlFor="repeat-new-password" className="uppecase font-bold text-gray-600 ">Repeat New Password</label>
                            <input
                                type="password"
                                id="repeat-new-password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                placeholder="Repeat your new password"
                                value={repeatNewPassword}
                                onChange={e => setRepeatNewPassword(e.target.value)} />
                        </div>

                        {isLoading
                            ? <Loader />
                            : <input
                                type="submit"
                                value="Change Password"
                                className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800" />}
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
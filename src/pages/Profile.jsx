import { useState } from "react"
import EditNav from "../components/EditNav"
import useAuth from "../hooks/useAuth"
import Loader from "../components/Loader"
import Alert from "../components/Alert"

function Profile() {

    const [newName, setNewName] = useState('')
    const [newSurname, setNewSurname] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newSpeciality, setNewSpeciality] = useState('')
    const [newHospital, setNewHospital] = useState('')
    const [newLocation, setNewLocation] = useState('')

    const [alert, setAlert] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { auth, updateProfile } = useAuth()

    const { name, surname, phone, speciality, email, hospital, location } = auth

    const hanldeEdit = async (e) => {
        e.preventDefault()

        setIsLoading(true)

            const profile = {
                name: newName || name,
                surname: newSurname || surname,
                phone: newPhone || phone,
                speciality: newSpeciality || speciality,
                hospital: newHospital || hospital,
                location: newLocation || location
            }

            

            const response = await updateProfile(profile)

            setAlert(response)

            setNewName('')
            setNewSurname('')
            setNewPhone('')
            setNewSpeciality('')
            setNewHospital('')
            setNewLocation('')

            setIsLoading(false)
    }

    const { message } = alert

    return (
        <>
            <EditNav />

            <h2 className="font-black text-3xl text-center mt-5">Edit Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">Edit your {' '} <span className="text-indigo-600 font-bold">your Information</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                {message && <Alert alert={alert} />}

                    <form onSubmit={hanldeEdit}>
                        <div className="my-3">
                            <label htmlFor="email" className="uppecase font-bold text-gray-600 ">Email</label>
                            <input type="text" id="email" className="border bg-gray-50 w-full p-2 mt-2 rounded-lg" placeholder={email} disabled />
                        </div>
                        <div className="my-3">
                            <label htmlFor="name" className="uppecase font-bold text-gray-600 ">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                                placeholder={name}
                                value={newName}
                                onChange={e => setNewName(e.target.value)} />
                        </div>
                        <div className="my-3">
                            <label htmlFor="surname" className="uppecase font-bold text-gray-600 ">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                                placeholder={surname}
                                value={newSurname}
                                onChange={e => setNewSurname(e.target.value)} />
                        </div>

                        <div className="my-3">
                            <label htmlFor="phone" className="uppecase font-bold text-gray-600 ">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                                placeholder={phone}
                                value={newPhone}
                                onChange={e => setNewPhone(e.target.value)} />
                        </div>

                        <div className="my-3">
                            <label htmlFor="speciality" className="uppecase font-bold text-gray-600 ">Speciality</label>
                            <input
                                type="text"
                                id="speciality"
                                className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                                placeholder={speciality}
                                value={newSpeciality}
                                onChange={e => setNewSpeciality(e.target.value)} />
                        </div>

                        <div className="my-3">
                            <label htmlFor="hospital" className="uppecase font-bold text-gray-600 ">Hospital</label>
                            <input
                                type="text"
                                id="hospital"
                                className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                                placeholder={hospital}
                                value={newHospital}
                                onChange={e => setNewHospital(e.target.value)} />
                        </div>

                        <div className="my-3">
                            <label htmlFor="location" className="uppecase font-bold text-gray-600 ">Location</label>
                            <input
                                type="text"
                                id="location"
                                className="border bg-gray-50 w-full p-2 mt-2 rounded-lg"
                                placeholder={location}
                                value={newLocation}
                                onChange={e => setNewLocation(e.target.value)} />
                        </div>


                        {isLoading
                            ? <Loader />
                            : <input type="submit"
                                value="Save changes"
                                className="bg-indigo-700 uppercase font-bold w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800" />}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile
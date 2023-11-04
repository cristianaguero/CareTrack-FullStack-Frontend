import usePatients from "../hooks/usePatients"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import axiosClient from "../config/AxiosClient"

function PatientEdit() {

    const id = window.location.pathname.split('/')[4]

    const { patients } = usePatients()

    const patient = patients.find(patient => patient._id === id)

    const { allergies, birthdate, blood_type, clinical_history, current_medications, current_treatment, diagnosis, email, family_background, height, name, other_notes, phone, pre_existing_diseases, residence, surname, symptoms, weight } = patient

    const [newName, setNewName] = useState("")
    const [newSurname, setNewSurname] = useState('')
    const [newBirthdate, setNewBirthdate] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newResidence, setNewResidence] = useState('')
    const [newAppointment, setNewAppointment] = useState('')
    const [newHour, setNewHour] = useState('')
    const [newDiagnosis, setNewDiagnosis] = useState('')
    const [newHeight, setNewHeight] = useState('')
    const [newWeight, setNewWeight] = useState('')
    const [newAllergies, setNewAllergies] = useState('')
    const [newBlood_type, setNewBlood_type] = useState('')
    const [newSymptoms, setNewSymptoms] = useState('')
    const [newClinical_history, setNewClinical_history] = useState('')
    const [newCurrent_medications, setNewCurrent_medications] = useState('')
    const [newCurrent_treatment, setNewCurrent_treatment] = useState('')
    const [newFamily_background, setNewFamily_background] = useState('')
    const [newOther_notes, setNewOther_notes] = useState('')
    const [newPre_existing_diseases, setNewPre_existing_diseases] = useState('')

    const [alert, setAlert] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { message } = alert

    const handleChanges = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('CareTrack');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const nextAppointment = `${newAppointment} ${newHour}`

        const patient = {
            name: newName,
            surname: newSurname,
            birthdate: newBirthdate,
            phone: newPhone,
            residence: newResidence,
            appointment: nextAppointment,
            diagnosis: newDiagnosis,
            height: newHeight,
            weight: newWeight,
            allergies: newAllergies,
            blood_type: newBlood_type,
            symptoms: newSymptoms,
            clinical_history: newClinical_history,
            current_medications: newCurrent_medications,
            current_treatment: newCurrent_treatment,
            family_background: newFamily_background,
            other_notes: newOther_notes,
            pre_existing_diseases: newPre_existing_diseases
        }

        setIsLoading(true)
        try {
            const { data } = await axiosClient.put(`/patients/${id}`, patient, config)

            setAlert({ message: 'Saved successfuly', error: false  })

        } catch (error) {
            setAlert({ message: error.response.data.message, error: true })

        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
            <h2 className="font-black text-3xl text-center mt-5">Patient Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">Check your {' '} <span className="text-indigo-600 font-bold"> Patient's Information</span></p>

            {message && <Alert alert={alert} />}

            <div className="flex flex-col items-center justify-center gap-5">

                <form
                    className="flex flex-col items-center justify-center gap-5 w-full"
                    onSubmit={handleChanges}>
                    <div className="grid grid-cols-2 w-full bg-white shadow rounded-lg p-5 gap-3">
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="name">
                                Name
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="name"
                                type="text"
                                placeholder={name}
                                value={newName}
                                onChange={e => setNewName(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="surname">
                                Surame
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="surname"
                                type="text"
                                placeholder={surname}
                                value={newSurname}
                                onChange={e => setNewSurname(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="birthdate">
                                Birthdate
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="birthdate"
                                type="date"
                                placeholder={birthdate}
                                value={newBirthdate}
                                onChange={e => setNewBirthdate(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="email">
                                email
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="email"
                                type="text"
                                placeholder={email}
                                disabled />
                        </div>

                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="phone">
                                phone
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="phone"
                                type="text"
                                placeholder={phone}
                                value={newPhone}
                                onChange={e => setNewPhone(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="residence">
                                residence
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="residence"
                                type="text"
                                placeholder={residence}
                                value={newResidence}
                                onChange={e => setNewResidence(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="next_appointment">
                                next appointment
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="next_appointment"
                                type="date"
                                value={newAppointment}
                                onChange={e => setNewAppointment(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="hour">
                                hour
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="hour"
                                type="time"
                                value={newHour}
                                onChange={e => setNewHour(e.target.value)} />
                        </div>
                    </div>


                    <div className="grid grid-cols-2 w-full bg-white shadow rounded-lg p-5 gap-3">
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="diagnosis">
                                diagnosis
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="diagnosis"
                                type="text"
                                placeholder={diagnosis}
                                value={newDiagnosis}
                                onChange={e => setNewDiagnosis(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="height">
                                height
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="height"
                                type="text"
                                placeholder={height}
                                value={newHeight}
                                onChange={e => setNewHeight(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="weight">
                                weight
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="weight"
                                type="text"
                                placeholder={weight}
                                value={newWeight}
                                onChange={e => setNewWeight(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="blood_type">
                                blood type
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="blood_type"
                                type="text"
                                placeholder={blood_type}
                                value={newBlood_type}
                                onChange={e => setNewBlood_type(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="allergies">
                                allergies
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="allergies"
                                type="text"
                                placeholder={allergies}
                                value={newAllergies}
                                onChange={e => setNewAllergies(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 uppercase font-bold"
                                htmlFor="symptoms">
                                symptoms
                            </label>
                            <input
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                id="symptoms"
                                type="text"
                                placeholder={symptoms}
                                value={newSymptoms}
                                onChange={e => setNewSymptoms(e.target.value)} />
                        </div>



                        <div className="flex flex-col col-span-2">
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 uppercase font-bold"
                                    htmlFor="pre_existing_diseases">
                                    pre existing diseases
                                </label>
                                <input
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    id="pre_existing_diseases"
                                    type="text"
                                    placeholder={pre_existing_diseases}
                                    value={newPre_existing_diseases}
                                    onChange={e => setNewPre_existing_diseases(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 uppercase font-bold"
                                    htmlFor="family_background">
                                    family background
                                </label>
                                <input
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    id="family_background"
                                    type="text"
                                    placeholder={family_background}
                                    value={newFamily_background}
                                    onChange={e => setNewFamily_background(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 uppercase font-bold"
                                    htmlFor="current_medications">
                                    current medications
                                </label>
                                <input
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    id="current_medications"
                                    type="text"
                                    placeholder={current_medications}
                                    value={newCurrent_medications}
                                    onChange={e => setNewCurrent_medications(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 uppercase font-bold"
                                    htmlFor="current_treatment">
                                    current treatment
                                </label>
                                <input
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    id="current_treatment"
                                    type="text"
                                    placeholder={current_treatment}
                                    value={newCurrent_treatment}
                                    onChange={e => setNewCurrent_treatment(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 uppercase font-bold"
                                    htmlFor="clinical_history">
                                    clinical history
                                </label>
                                <input
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    id="clinical_history"
                                    type="text"
                                    placeholder={clinical_history}
                                    value={newClinical_history}
                                    onChange={e => setNewClinical_history(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label
                                    className="block text-gray-700 uppercase font-bold"
                                    htmlFor="other_notes">
                                    other note
                                </label>
                                <input
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                    id="other_notes"
                                    type="text"
                                    placeholder={other_notes}
                                    value={newOther_notes}
                                    onChange={e => setNewOther_notes(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-4/5 bg-white shadow rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            {isLoading
                                ? <Loader />
                                : <input
                                    type='submit'
                                    value='Save changes'
                                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg mx-2 hover:cursor-pointer" />}
                            <Link
                                to={`/admin/patient/${id}`}
                                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg mx-2">
                                Cancel edition
                            </Link>
                        </div>
                    </div>
                </form>

                {message && <Alert alert={alert} />}


            </div>
        </>
    )
}

export default PatientEdit
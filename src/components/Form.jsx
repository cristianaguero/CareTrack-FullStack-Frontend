import { useState, useEffect } from 'react'
import usePatients from '../hooks/usePatients.jsx'
import Alert from '../components/Alert.jsx'
import Loader from '../components/Loader.jsx'

function Form() {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [admissionDate, setAdmissionDate] = useState('')
    const [hour, setHour] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [id, setId] = useState(null)

    const [alert, setAlert] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { message } = alert

    const { savePatient, patient, setEdition } = usePatients()

    useEffect(() => {
        if (patient?.name) {
            setName(patient.name)
            setSurname(patient.surname)
            setEmail(patient.email)
            setPhone(patient.phone)
            setSymptoms(patient.symptoms)

            const [date, hour] = patient.appointment.split('T')
            const hourMinute = hour.substring(0, 5)

            setAdmissionDate(date)
            setHour(hourMinute)

            setId(patient._id)
        }
    }, [patient])

    async function handleAddPatient(e) {
        e.preventDefault()

        if ([name, surname, email, phone, symptoms].includes('')) {
            setAlert({ message: 'All fields are required', error: true })
            return
        }

        setAlert({})
        setIsLoading(true)

        const appointment = `${admissionDate} ${hour}`

        try {
            savePatient({ name, surname, email, phone, appointment, symptoms, id })

            setName('')
            setSurname('')
            setEmail('')
            setPhone('')
            setAdmissionDate('')
            setHour('')
            setSymptoms('')
            setId(null)

            setAlert({ message: 'Saved successfuly', error: false })

        } catch (error) {
            setAlert({ message: error.response.data.message, error: true })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setName('')
        setSurname('')
        setEmail('')
        setPhone('')
        setAdmissionDate('')
        setHour('')
        setSymptoms('')
        setId(null)

        setAlert({})
        setEdition({})
    }


    return (
        <>
            <div>
                <h2 className="font-black text-3xl text-center">Patient Monitoring</h2>
                <p className="text-lg mt-1 text-center mb-5">Add patients and {''}
                    <span className="font-bold text-indigo-600">manage them</span>
                </p>
            </div>

            {message && <Alert alert={alert} />}

            <form
                onSubmit={handleAddPatient}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="name">
                        Name
                    </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="name"
                        type="text"
                        placeholder="Patient's First Name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="surname">
                        Surname
                    </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="surname"
                        type="text"
                        placeholder="Patient's Last Name"
                        value={surname}
                        onChange={e => setSurname(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="email"
                        type="email"
                        placeholder="Patient's Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="phone"
                        type="text"
                        placeholder="Patient's Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="admissionDate">
                        Next Appointment
                    </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="admissionDate"
                        type="date"
                        value={admissionDate}
                        onChange={e => setAdmissionDate(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="hour">
                        Hour
                    </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="hour"
                        type='time'
                        value={hour}
                        onChange={e => setHour(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="symptoms">
                        Symptoms
                    </label>
                    <textarea
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        name="symptoms"
                        id=""
                        cols="30"
                        rows="2"
                        placeholder="Describe the symptoms here..."
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)} />
                </div>
                <div className='flex gap-5'>
                    {isLoading
                        ? <Loader />
                        : <input
                            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 rounded-xl cursor-pointer transition-all"
                            type="submit"
                            value={id ? 'Edit Patient' : 'Add Patient'} />}
                    {id
                        && <button
                            className="bg-red-600 w-full p-3 text-white uppercase font-bold hover:bg-red-700 rounded-xl cursor-pointer transition-all"
                            onClick={handleCancel}>Cancel</button>}
                </div>
            </form>
            {message && <Alert alert={alert} />}


        </>
    )
}

export default Form
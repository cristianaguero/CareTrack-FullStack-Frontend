import usePatients from "../hooks/usePatients"
import { Link } from "react-router-dom"
import formatDate from "../helpers/formatDate"

function Patient() {

    const id = window.location.pathname.split('/')[3]

    const { deletePatient, patients } = usePatients()

    const patient = patients.find(patient => patient._id === id)

    const {  allergies, appointment, birthdate, blood_type, clinical_history, current_medications, current_symptoms, current_treatment, diagnosis, email, family_background, height, name, other_notes, phone, pre_existing_diseases, residence, surname, symptoms, weight } = patient

    return (
        <>
            <h2 className="font-black text-3xl text-center mt-5">Patient Profile</h2>
            <p className="text-xl mt-5 mb-10 text-center">Check your {' '} <span className="text-indigo-600 font-bold"> Patient's Information</span></p>

            <div className="flex flex-col items-center justify-center gap-5">

                <div className="grid grid-cols-2 w-full bg-white shadow rounded-lg p-5">
                    <p className="font-bold mb-3 text-gray-700 uppercase">Name: {''}
                        <span className="font-normal normal-case"> {name} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">Surname: {''}
                        <span className="font-normal normal-case"> {surname} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">Birthdate: {''}
                        <span className="font-normal normal-case"> {birthdate} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
                        <span className="font-normal normal-case"> {email} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">Phone: {''}
                        <span className="font-normal normal-case"> {phone} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">Residence: {''}
                        <span className="font-normal normal-case"> {residence} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">Next appointmet: {''}
                        <span className="font-normal normal-case"> {formatDate(appointment)} </span>
                    </p>
                </div>

                <div className="grid grid-cols-2 w-full bg-white shadow rounded-lg p-5">
                <p className="font-bold mb-3 text-gray-700 uppercase">diagnosis: {''}
                        <span className="font-normal normal-case"> {diagnosis} </span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">height: {''}
                        <span className="font-normal normal-case"> {height} </span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">weight: {''}
                        <span className="font-normal normal-case"> {weight} </span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">blood type: {''}
                        <span className="font-normal normal-case"> {blood_type} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">allergies: {''}
                        <span className="font-normal normal-case"> {allergies} </span>
                    </p>

                    <p className="font-bold mb-3 text-gray-700 uppercase">symptoms: {''}
                        <span className="font-normal normal-case"> {symptoms} </span>
                    </p>

                    <div className="flex flex-col">
                        <p className="font-bold mb-3 text-gray-700 uppercase">pre existing diseases: {''}
                            <span className="font-normal normal-case"> {pre_existing_diseases} </span>
                        </p>

                        <p className="font-bold mb-3 text-gray-700 uppercase">family background: {''}
                            <span className="font-normal normal-case"> {family_background} </span>
                        </p>

                        <p className="font-bold mb-3 text-gray-700 uppercase">current medications: {''}
                            <span className="font-normal normal-case"> {current_medications} </span>
                        </p>

                        <p className="font-bold mb-3 text-gray-700 uppercase">current treatment: {''}
                            <span className="font-normal normal-case"> {current_treatment} </span>
                        </p>

                        <p className="font-bold mb-3 text-gray-700 uppercase">clinical history: {''}
                            <span className="font-normal normal-case"> {clinical_history} </span>
                        </p>

                        <p className="font-bold mb-3 text-gray-700 uppercase">other notes: {''}
                            <span className="font-normal normal-case"> {other_notes} </span>
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-4/5 bg-white shadow rounded-lg p-5">
                    <div className="flex justify-between items-center">
                        <Link
                            to={`/admin/patient/edit/${id}`}
                            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg mx-2">
                            Edit Info
                        </Link>
                        <button
                            type="button"
                            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg mx-2"
                            onClick={() => {
                                deletePatient(id)
                                }}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Patient
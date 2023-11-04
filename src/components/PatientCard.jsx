import usePatients from "../hooks/usePatients";
import { Link } from "react-router-dom";

function PatientCard({ patient }) {

    const { name, surname, email, phone, diagnosis, _id } = patient;

    return (
        <div className="mx-5 mb-3 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold mb-3 text-gray-700 uppercase">Name: {''}
                <span className="font-normal normal-case"> {name} </span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Surname: {''}
                <span className="font-normal normal-case"> {surname} </span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
                <span className="font-normal normal-case"> {email} </span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">Phone: {''}
                <span className="font-normal normal-case"> {phone} </span>
            </p>

            <p className="font-bold mb-3 text-gray-700 uppercase">Diagnosis: {''}
                <span className="font-normal normal-case"> {diagnosis} </span>
            </p>

            <div className="flex justify-center items-center mt-10">
                <Link
                    to={`/admin/patient/${_id}`}
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg">
                    Patient Info
                </Link>
            </div>
        </div>
    )
}

export default PatientCard
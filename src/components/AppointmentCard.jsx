import usePatients from "../hooks/usePatients";
import formatDate from "../helpers/formatDate.js";

function Patient({ patient }) {

    const { setEdition } = usePatients()

    const { name, surname, email, phone, appointment, symptoms } = patient;

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
            <p className="font-bold mb-3 text-gray-700 uppercase">Date: {''}
                <span className="font-normal normal-case"> {formatDate(appointment)} </span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Phone: {''}
                <span className="font-normal normal-case"> {phone} </span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">Symptoms: {''}
                <span className="font-normal normal-case"> {symptoms} </span>
            </p>

            <div className="flex justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setEdition(patient)}
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default Patient
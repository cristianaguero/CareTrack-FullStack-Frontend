import usePatients from "../hooks/usePatients"
import ApointmentCard from "./AppointmentCard"

function PatientsList() {

    const { patients } = usePatients()

    const sortedPatients = [...patients]

    sortedPatients.sort((a, b) => {
        const dateA = new Date(a.appointment)
        const dateB = new Date(b.appointment)
        return dateA - dateB
    })

    return (
        <div className="h-screen overflow-y-auto">

            {patients && patients.length ? (
                <>
                    <h2 className="text-3xl font-black text-center">Next Appointments</h2>
                    <p className="text-lg mt-1 text-center mb-5"> Manage your {''}
                        <span className="font-bold text-indigo-600">
                            patients and appointments
                        </span>
                    </p>

                {sortedPatients.map(patient => (
                    <ApointmentCard key={patient._id} patient={patient} />
                ))}

                </>
            ) : (
                <>
                    <h2 className="text-3xl font-black text-center">No patientes yet</h2>
                    <p className="text-lg mt-1 text-center mb-5"> Start by adding {''}
                        <span className="font-bold text-indigo-600">
                            patients and appointments
                        </span>
                    </p>
                </>
            )}
        </div>
    )
}

export default PatientsList
import usePatients from "../hooks/usePatients.jsx"
import PatientCard from "../components/PatientCard.jsx"


function Patients() {

    const { patients } = usePatients()

    const sortedPatients = [...patients]

    sortedPatients.sort((a, b) => {
        const A = new Date(a.surname)
        const B = new Date(b.surname)
        return A - B
    })

    return (
        <>
        
        {patients && patients.length ? (
                <>
                    <h2 className="text-3xl font-black text-center">Patients List</h2>
                    <p className="text-lg mt-1 text-center mb-5"> Manage your {''}
                        <span className="font-bold text-indigo-600">
                            patients and their hystory
                        </span>
                    </p>

                <div className="md:grid md:grid-cols-3">
                {sortedPatients.map(patient => (
                    <PatientCard key={patient._id} patient={patient} />
                ))}
                </div>

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
        </>
    )
}

export default Patients
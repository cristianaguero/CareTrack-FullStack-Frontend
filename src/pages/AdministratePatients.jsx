import { useState } from "react"
import Form from "../components/Form"
import NextAppointments from "../components/NextAppointments"

function AdministratePatients() {

    const [showForm, setShowForm] = useState(false)

    return (
        <div className="flex flex-col md:flex-row">
            <button
            className="bg-indigo-600 text-white font-bold uppercase rounded-xl p-3 mb-10 md:hidden mx-5"
            onClick={() => setShowForm(!showForm)}
            >{showForm ? 'Hide Form' : 'Show Form'}</button>
            <div className={`${showForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
<Form />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
<NextAppointments />
            </div>
        </div>
    )
}

export default AdministratePatients
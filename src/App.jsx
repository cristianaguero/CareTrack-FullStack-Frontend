import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx'
import { PatientsProvider } from './context/PatientsProvider.jsx'
import AuthLayout from './Layout/AuthLayout.jsx'
import PrivateLayout from './Layout/PrivateLayout.jsx'
import AdministratePatients from './pages/AdministratePatients.jsx'
import ConfirmAccount from './pages/ConfirmAccount.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import Login from './pages/Login.jsx'
import NewPassword from './pages/NewPassword.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import Patients from './pages/Patients.jsx'
import Patient from './pages/Patient.jsx'
import PatientEdit from './pages/PatientEdit.jsx'


function App() {


  return (

    <BrowserRouter>

      <AuthProvider>
        <PatientsProvider>

        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='confirm-account/:token' element={<ConfirmAccount />} />
            <Route path='forget-password' element={<ForgetPassword />} />
            <Route path='forget-password/:token' element={<NewPassword />} />
          </Route>

          <Route path="/admin" element={<PrivateLayout />} >
            <Route index element={<AdministratePatients />} />
            <Route path='patients' element={<Patients />} />
            <Route path='patient/:id' element={<Patient />} />
            <Route path='patient/edit/:id' element={<PatientEdit />} />
            <Route path='profile' element={<Profile />} />
            <Route path='profile/change-password' element={<ChangePassword />} />
          </Route>


          <Route path="*" element={<h1>Not Found</h1>} />

        </Routes>

        </PatientsProvider>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App

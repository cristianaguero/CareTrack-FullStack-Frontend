import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './Layout/AuthLayout.jsx'
import ConfirmAccount from './pages/ConfirmAccount.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import Login from './pages/Login.jsx'
import NewPassword from './pages/NewPassword.jsx'
import Register from './pages/Register.jsx'

function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='confirm-account/:token' element={<ConfirmAccount />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='forget-password/:token' element={<NewPassword />} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App

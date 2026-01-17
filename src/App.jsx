import { Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import SignIn from "./Pages/SignIn";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import Signup from './Pages/SignUp'
import DashBoard from "./Pages/Dashboard";

function App() {


  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>

      <Route path="/" element={<Navigate to="/signup" />} />

    </Routes>
  )
}

export default App

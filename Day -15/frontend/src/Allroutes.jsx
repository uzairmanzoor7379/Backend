import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Home from "./Home";

const Allroutes = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>


     
    </div>
  )
}

export default Allroutes


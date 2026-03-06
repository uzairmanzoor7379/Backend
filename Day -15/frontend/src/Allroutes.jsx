import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Feed from "./features/posts/pages/feed";
import CreatePost from "./features/posts/pages/CreatePost";

const Allroutes = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/feed" element={<Feed/>} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-post" element={<CreatePost/>} />
      </Routes>
      </BrowserRouter>


     
    </div>
  )
}

export default Allroutes


import "../style/register.scss"
import Form from '../components/Form'
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  
   const {handleRegister} = useAuth()
  


  async function handlesubmit(e) {
     e.preventDefault()
     await handleRegister(username , email , password)
      navigate('/')
  }
  return (
    <main className="register-container">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handlesubmit} >
          <Form label={"Username"} type = {"text"} value = {username} set = {setusername} />
          <Form label={"Email"} type = {"email"} value = {email} set = {setemail} />
          <Form label={"Password"} type = {"password"} value = {password} set = {setpassword}  />
          <button className="button" type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link  to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register

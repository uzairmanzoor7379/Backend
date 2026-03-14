import "../style/login.scss"
import Form from '../components/Form'
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
   const{handlelogin} = useAuth()
  async function handlesubmit(e) {
     e.preventDefault()
     await handlelogin(username,password)
      navigate('/')
  }

  return (
    <main className="login-container">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
          <Form  label={"Username"} type = {"username"} value = {username} set = {setusername} />
          <Form label={"Password"} type = {"password"} value = {password} set = {setpassword}  />
          <button className="button" type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link  to={"/register"}>Create one</Link></p>
      </div>
    </main>
  )
}

export default Login

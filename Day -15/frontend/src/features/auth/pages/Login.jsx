import  { useState } from 'react'
import {Link,  useNavigate} from 'react-router'
import { useAuth } from '../hooks/use.auth.js'
const Login = () => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
   
    
  const {handleLogin , loading} = useAuth()
  
   const Navigate = useNavigate()
  if(loading){
    return(
      <h1>
        Loading.....
      </h1>
    )
  }
  return (
    <main>  
      <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={(e)=>{
          e.preventDefault()
           handleLogin(username , password)
           .then((res)=>{
            console.log(res)
            Navigate('/')
           })


           setusername('')
           setpassword('')
      }} >
        <input onInput={(e)=>{
             setusername(e.target.value)
        }}
         type="text" placeholder='Enter your Username' value={username} />

        <input onInput={(e)=>{
             setpassword(e.target.value)
        }}
        type="password" placeholder='Enter your Password' value={password}/>
        <button className='btn'>Login</button>
      </form>
      <p>Don't have an account? <Link className='link' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login

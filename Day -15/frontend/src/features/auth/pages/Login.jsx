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
      <main className='form-main'><h1>
        Loading.....
      </h1></main>
    )
  }
   const handlesubmit =   async (e) => {
         e.preventDefault()
         await handleLogin(username  , password)
          Navigate('/feed')
      }
  return (
    <main className='main'>  
      <div className="left-brand">
        <h1>Instagram</h1>
        <div className="divider" />
        <p>Share your moments, connect with people who matter.</p>
        <div className="stats">
          <div className="stat">
            <div className="num">2B+</div>
            <div className="label">Users</div>
          </div>
          <div className="stat">
            <div className="num">100M+</div>
            <div className="label">Posts/day</div>
          </div>
        </div>
      </div>
      <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={(e)=>{
          handlesubmit(e)
           setusername('')
           setpassword('')
      }} >
        <input onInput={(e)=>{
             setusername(e.target.value)
        }}
         type="text" required placeholder='Enter your Username' value={username} />

        <input onInput={(e)=>{
             setpassword(e.target.value)
        }}
        type="password" required placeholder='Enter your Password' value={password}/>
        <button className='btn'>Login</button>
      </form>
      <p>Don't have an account? <Link className='link' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login

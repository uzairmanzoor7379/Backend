import { useState } from 'react'
import {Link} from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/use.auth'
const Register = () => {
   const [username, setusername] = useState('')
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const [bio, setbio] = useState('')
   const [isPrivate, setisPrivate] = useState('')
      
   const {handleRegister,loading} = useAuth()
     if(loading){
      return (
         <h1>Loading.....</h1>
      )
     }
  return (
    <main>
        <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={(e)=>{
          e.preventDefault()
           handleRegister(username , email , password , bio , isPrivate).then((res)=>{
            console.log(res)
           })
              setusername(''),
              setemail(''),
              setpassword('')
              setbio('')
              setisPrivate('')
        }} >
            <input onInput={(e)=>{
               setusername(e.target.value)
            }}
            type="text" placeholder='Enter your username' value = {username}/> 

            <input  onInput={(e)=>{
               setemail(e.target.value)
            }}
             type="text" placeholder='Enter your email' value = {email}/> 
            <input  onInput={(e)=>{
               setpassword(e.target.value)
            }}
            type="password" placeholder='Enter your password ' value = {password}/> 
            <input onInput={(e)=>{
               setbio(e.target.value)
            }} 
             type="text" placeholder='Enter your bio' value ={bio}/> 
            <input onInput={(e)=>{
               setisPrivate(e.target.value)
            }}
            type="text" placeholder='Account isPrivate' value = {isPrivate}/> 
            <button type='submit' className='btn' 
            >Register</button>

        </form>
       <p>Already have an account? <Link className='link' to='/login'>Login</Link>  </p>
        
    
        </div>
    </main>
  )
}

export default Register

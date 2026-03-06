import { useState } from 'react'
import {Link, useNavigate} from 'react-router'
import "../style/form.scss"
import { useAuth } from '../hooks/use.auth'

const Register = () => {
   const [username, setusername] = useState('')
   const [email, setemail] = useState('')
   const [password, setpassword] = useState('')
   const [bio, setbio] = useState('')
   const [isPrivate, setisPrivate] = useState('')
   const Navigate = useNavigate()
   const {handleRegister, loading} = useAuth()

   if(loading){
      return (
         <main className='form-main'>
            <h1>Loading.....</h1>
         </main>
      )
   }

   const handlesubmit = async (e) => {
      e.preventDefault()
      await handleRegister(username, email, password, bio, isPrivate)
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
        <h2>Create Account</h2>
        <span className="subtitle">Join millions sharing their world</span>

        <form onSubmit={(e) => {
          handlesubmit(e)
          setusername('')
          setemail('')
          setpassword('')
          setbio('')
          setisPrivate('')
        }}>

          <label className="field-label">Username</label>
          <input required
            onInput={(e) => setusername(e.target.value)}
            type="text" placeholder='e.g. john_doe' value={username}
          />

          <label className="field-label">Email</label>
          <input required
            onInput={(e) => setemail(e.target.value)}
            type="text" placeholder='you@example.com' value={email}
          />

          <label className="field-label">Password</label>
          <input required
            onInput={(e) => setpassword(e.target.value)}
            type="password" placeholder='Min. 8 characters' value={password}
          />

          <label className="field-label">Bio</label>
          <input
            onInput={(e) => setbio(e.target.value)}
            type="text" placeholder='Tell something about you...' value={bio}
          />

          <label className="field-label">Account Privacy</label>
          <select
            onChange={(e) => setisPrivate(e.target.value)}
            value={isPrivate}
          >
            <option value="">Select privacy</option>
            <option value="false">Public</option>
            <option value="true">Private</option>
          </select>

          <button type='submit' className='btn'>Create Account</button>

        </form>

        <p>Already have an account? <Link className='link' to='/login'>Login</Link></p>
      </div>

    </main>
  )
}

export default Register
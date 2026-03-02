import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const Navigate = useNavigate()
  return (
    <nav className='nav-bar'>
        <p>Instagram</p>
        <button onClick={()=>{
             Navigate('/create-post')
        }}
        className='btn'>New Post</button>

    </nav>
  )
}

export default Nav

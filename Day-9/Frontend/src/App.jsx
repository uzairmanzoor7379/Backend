import {  useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [user, setuser] = useState('')
  const [email, setemail] = useState('')
  const [userdata, setuserdata] = useState([])
   function getdata(){
     axios.get('http://localhost:3000/api/userdata').then((res)=>{
      setuserdata(res.data.alldata)
    }).catch(err=>console.log(err))
   }
   function datahandlepost(){
    axios.post('http://localhost:3000/api/userdata', {user,email}).then((res)=>{
      console.log(res.data)
      getdata()
      setemail('')
      setuser('')
    }).catch(err=>console.log(err))
   }
   function datahandledelete(id){
       
       axios.delete(`http://localhost:3000/api/userdata/${id}`).then(()=>{
         getdata()
       }).catch(err=>console.log(err))
   }
   function datahandleupdate(id){
    console.log(id)
    console.log(email)
        axios.patch(`http://localhost:3000/api/userdata/${id}`,{email:email}).then(()=>{
          getdata()
          setemail('')
        }).catch(err=>console.log(err))
   }
    useEffect(()=>{
      getdata()
    },[])
  return (
    <>
    <form onSubmit={(e)=>{
         e.preventDefault()
         datahandlepost()
      }}
    className='form'>
      <input onChange={(e)=>{
       setuser(e.target.value)
      }} className='input' type="text" placeholder='Enter Your Name' value={user} required />
      <input onChange={(e)=>{
        setemail(e.target.value)
      }} className='input' type="text" placeholder='Enter Your Email / update' value={email} required />
      <button className='button'>Submit</button>
    </form>
    <div className='userdata'>
      {userdata.map((elem,idx)=>{
        return <div key={idx} className='data'>
          <h3>{elem.user}</h3>
               <h3>{elem.email}</h3>
               <div><button onClick={()=>{
                  datahandledelete(elem._id)
               }} className='btn'>delete</button>
               <button onClick={()=>{
                datahandleupdate(elem._id)
               }} className='btn bt1' >update</button></div>
        </div>
      })}
    </div>
    </>
  )
}

export default App

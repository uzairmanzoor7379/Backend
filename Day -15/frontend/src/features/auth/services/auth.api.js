import axios from "axios"

const api = axios.create({
    baseURL : 'http://localhost:3000/api/auth',
    withCredentials : true
})
   
 export async function register(username , email , password , bio , isPrivate) {
       try {
     const response =    await api.post('/register',{
        username , email , password , bio , isPrivate
       }) 
       console.log(response.data)
       return response.data 
    } 
      catch (err) {
        console.log(err)
       }    
 }

 export async function login(username , password , ) {
      
    try {
     const response = await api.post('/login',{
        username , password
       }) 
       return response.data
     } 
      catch (err) {
        console.log(err)
       }    
      
 }

 export async function getme() {
      try {
        const response = await api.get("/getme")
        return response.data
      } catch (error) {
       console.log(error)
      }

      
 }
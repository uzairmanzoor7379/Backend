import axios from "axios"


const api = axios.create({
    baseURL : "http://localhost:3000/api/user",
    withCredentials : true
})


 export async function follow(username) {
    const response = await api.post('/follow/' + username)
    return response
    
 }

 export async function unfollow(username) {
    const response = await api.delete('/unfollow/' + username)
    return response
    
 }

 export async function followdata() {
     const response = await api('/follow/data')

     return response.data
 }
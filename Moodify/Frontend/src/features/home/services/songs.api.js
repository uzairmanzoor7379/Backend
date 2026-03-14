import axios from "axios"

const api = axios.create({
    baseURL: "https://backend-gac6.onrender.com",
    withCredentials : true
})


export async function getsong({mood}) {
       const response = await api.get('/api/songs?mood=' + mood)
       console.log(response)
      return response.data
}
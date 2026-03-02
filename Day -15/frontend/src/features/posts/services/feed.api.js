import axios from "axios"


const api = axios.create({
    baseURL : "http://localhost:3000/api/posts",
    withCredentials: true
})


export async function getAllPosts() {
   const response = await api.get('/allposts')
    
   return response.data
}

export async function createPost(imageFile,caption) {
    const formdata = new FormData()
    formdata.append('image',imageFile)
    formdata.append('caption', caption)

    const response = await api.post('/',formdata)
     console.log(response)
    return response.data

}

export async function likePost(postId) {
    
    const response = await api.post('/like/'+ postId)
    return response.data
}
export async function unlikePost(postId) {
    
    const response = await api.post('/unlike/'+ postId)
    return response.data
}
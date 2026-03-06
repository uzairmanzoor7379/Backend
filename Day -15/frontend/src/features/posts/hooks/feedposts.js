import {  useContext } from "react";
import { PostContext } from "../Feed.context";
import { createPost, getAllPosts, likePost, unlikePost } from "../services/feed.api";

export function Feedposts() {
   const context =  useContext(PostContext)
       const {loading , setloading , post , setpost ,allposts , setallposts } = context
    async function handleAllposts() {
         setloading(true)
        try {
            const data =  await getAllPosts()
        setallposts(data.posts)
        } catch (error) {
            console.log(error)
        }finally{
            setloading(false)
        }
    }
     async function handleCreatePost(imageFile , caption) {
            setloading(true)
            try {
                const data = await createPost(imageFile , caption)
                console.log(data)
            setallposts([data.post,...allposts])
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        
     }

     async function handlelikePost(postId) {
         await likePost(postId)
         setallposts(allposts => 
        allposts.map(post => post._id === postId ? {...post, isLiked: true} : post)
    )
        
        
     }
     async function handleunlikePost(postId) {
        await unlikePost(postId)
         setallposts(allposts => 
        allposts.map(post => post._id === postId ? {...post, isLiked: false} : post)
    )
        
     }
    return{handleAllposts , loading , post ,setpost, allposts ,setallposts, handleCreatePost ,handlelikePost,handleunlikePost }
}
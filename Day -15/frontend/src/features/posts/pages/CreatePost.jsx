
import "../css/createpost.scss"
import { useState , useRef } from 'react'
import { Feedposts } from '../hooks/feedposts'
import { useNavigate } from "react-router-dom"
const CreatePost = () => {
    const [Caption, setCaption] = useState('')
    const PostImageFileRef = useRef(null)
     const Navigate = useNavigate()
    const{loading , handleCreatePost} = Feedposts()
    
    async function handleSubmit(e) {
        e.preventDefault()
        const file = PostImageFileRef.current.files[0]
       await handleCreatePost(file , Caption )
       Navigate('/feed')
    }
   
    if(loading){
        return <main>
            <h1>Creating post.....</h1>
        </main>
    }
  return (
    <main>
        <div className="form-container form">
            <h1>CreatePost</h1>
            <form onSubmit={handleSubmit} >
                <label className='post-lable' htmlFor="image">Select</label>
                <input ref={PostImageFileRef} type="file" id='image' hidden />
                <input onChange={(e)=>{setCaption(e.target.value)}}
                 type="text" id='caption' placeholder='Enter caption' value={Caption}/>
                <button className='btn'>submit</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost

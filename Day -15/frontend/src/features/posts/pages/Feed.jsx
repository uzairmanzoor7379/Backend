import { useEffect } from 'react'
import "../css/feed.scss"
import { Feedposts } from '../hooks/feedposts'
import Post from '../components/Post.jsx'
import Nav from '../../shared/components/Nav.jsx'

const Feed = () => {

           
  const{handleAllposts , loading , allposts  } =  Feedposts()

  useEffect( ()=>{
       handleAllposts()
   },[])

      if(loading){
        return <main>
            <h1>Loading......</h1>
        </main>
      }
    
  return (
    <main>
       <Nav/>
        <div className="feed">
            <div className="posts">
     {allposts.map((elem ,idx)=>{
    return <Post key={idx} data = {elem} />
      })}
               
            </div>
        </div>
    </main>

  )
}

export default Feed

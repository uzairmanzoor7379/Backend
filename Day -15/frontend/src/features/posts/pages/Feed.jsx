import { useEffect } from 'react'
import "../css/feed.scss"
import { Feedposts } from '../hooks/feedposts'
import Post from '../components/Post.jsx'
import Nav from '../../shared/components/Nav.jsx'
import { useUserdata } from '../hooks/useUserData.js'

const Feed = () => {
     
  const{handleAllposts , loading , allposts   } =  Feedposts()
  const {handlefollowdata ,handlefollow , handleunfollow, follower , following , others} = useUserdata()
       
  console.log(follower)
          
  useEffect( ()=>{
       handleAllposts()
       handlefollowdata()
   },[])

      if(loading){
        return <main className='feed-main'>
            <h1>Loading......</h1>
        </main>
      }
    
  return (
    
    <main className='feed-main'>

       <Nav/>
         
        <div className="feed-container">
          <div className="follow-record">
            <div className="follower">
              <h2>Follower:</h2>
             
              {follower.map((e,idx)=>{
                 const alreadyFollowing = following.some(f => f.followee === e.follower)
                 return  <div key={idx} className="followeruser">
                <img src="https://imgs.search.brave.com/m12gFeEaYTH9TW9JHo1E4K4UFZBIAGpFdv-O_jdbty0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzgzLzk2/LzM2MF9GXzM0Njgz/OTY4M182bkFQemJo/cFNrSXBiOHBtQXd1/ZmtDN2M1ZUQ3d1l3/cy5qcGc" alt="" />
                <p>{e.follower} </p>
                {!alreadyFollowing && (
        <button onClick={() => handlefollow(e.follower)}>
          follow back
        </button>
      )}
              </div>
             })}
             
              
            </div>
            <hr />
            <div className="following">
              <h2>Following:</h2>
             
             {following.map((e,idx)=>{
               return <div key={idx} className="followinguser">
                <img src="https://imgs.search.brave.com/m12gFeEaYTH9TW9JHo1E4K4UFZBIAGpFdv-O_jdbty0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ2LzgzLzk2/LzM2MF9GXzM0Njgz/OTY4M182bkFQemJo/cFNrSXBiOHBtQXd1/ZmtDN2M1ZUQ3d1l3/cy5qcGc" alt="" />
                <p>{e.followee} </p>
                <button onClick={()=>{
                  handleunfollow(e.followee)
                }}>Unfollow</button>
              </div>
             })}
            </div>
            <hr />
            <div className="others">
              <h2>Others:</h2>
             
            {others.map((e , idx)=>{
              return <div key={idx} className="othersuser">
                <img src={e.img} alt="" />
                <p>{e.username} </p>
                <button onClick={()=>{
                  handlefollow(e.username)
                }}>follow</button>
              </div>
            })}
            </div>
          </div>
          <div className="feed">
            <div className="posts">
     {allposts.map((elem ,idx)=>{
    return <Post key={idx} data = {elem} />
      })}
               
            </div>
        </div>
        </div>
    </main>

  )
}

export default Feed

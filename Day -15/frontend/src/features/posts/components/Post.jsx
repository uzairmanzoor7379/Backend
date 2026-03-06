import React from 'react'
import { Feedposts } from '../hooks/feedposts'

const Post = ({data}) => {
  console.log(data)
  const{handlelikePost,handleunlikePost } = Feedposts()
  return (
    <>
      <div className="post">
                    <div className="top">
                       
                        <img src= {data.user.img} alt="" />
                       
                        <p>{data.user.username}</p>
                    </div>
                    <img src={data.image} alt="" />
                    <div className="icon">
                       <div className="left">
                         <button onClick={()=>{
                          {data.isLiked?handleunlikePost(data._id) : handlelikePost(data._id)}
                          
                         }} className='icon-button'>{data.isLiked ?<i className="ri-poker-hearts-fill red"></i>:<i className="ri-heart-3-line"></i> }</button>
                        <i className="ri-chat-3-line"></i>
                        <i className="ri-share-forward-fill"></i>
                       </div>
                       <div className="right"><i className="ri-bookmark-line"></i></div>
                    </div>
                    <div className="bottom">
                        <p>{data.caption}</p>
                    </div>
                </div>
    </>
  )
}

export default Post

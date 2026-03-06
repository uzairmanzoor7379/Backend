import { useContext } from "react";

import { follow, followdata, unfollow } from "../services/userdata.api";
import { PostContext } from "../Feed.context";

export function useUserdata() {
   const context = useContext(PostContext)
     const {follower,
        setfollower,
        following,
        setfollowing,
        others,
        setothers} = context

    async function handlefollow(username) {
        await follow(username)
    setothers(prev => prev.filter(u => u.username !== username))


    setfollowing(prev => [...prev, { followee: username, status: "accepted" }])

}

 async function handleunfollow(username) {
     await unfollow(username)
     // Following se hata do
    setfollowing(prev => prev.filter(u => u.followee !== username))

    // Others mein wapas add karo
    const isFollower = follower.some(f => f.follower === username)

     if (!isFollower) {
        setothers(prev => [...prev, { username }])
    }
}

  async function handlefollowdata() {
       const data = await followdata()
       setfollower(data.followers)
       setfollowing(data.following)
       setothers(data.others)
  }

  return {handlefollow , handleunfollow , handlefollowdata , follower , following , others }

}

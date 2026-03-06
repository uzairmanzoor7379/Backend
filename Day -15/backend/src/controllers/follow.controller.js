const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followController(req,res) {
      const followerUsername = req.user.username
      const followeeUsername = req.params.username

       const user = await userModel.findOne({username : followeeUsername})

          if(!user){
        return res.status(401).json({
        message : "User not found",
      })
       }

       let status;
        if(user.isPrivate){
          status = "pending"
        }
        else{
          status = "accepted"
        }
       
         if(followerUsername === followeeUsername){
            return res.status(400).json({
        message : "You can't follow yourself",
      })
         }
         const isAlreadyFollowed = await followModel.findOne({
            follower : followerUsername,
            followee : followeeUsername
         })
         if(isAlreadyFollowed){
          if(isAlreadyFollowed.status === 'pending'){
              return res.status(400).json({
                message : "Your request is already in pending"
         })
          }
          if(isAlreadyFollowed.status === 'accepted'){
              return res.status(400).json({
                message : "You have already followed this user"
         })
          }
          if(isAlreadyFollowed.status === 'rejected'){
            isAlreadyFollowed.status = "pending"
            isAlreadyFollowed.save()
            return res.status(200).json({
              message : "We have sent follow request again",
       })
          }
        }

      const followRecord = await followModel.create({
        follower : followerUsername,
        followee : followeeUsername,
        status: status

      })
      if(followRecord.status === "accepted"){
        return  res.status(201).json({
        message : `You are now following ${followeeUsername}`,
        data : followRecord
      })
      }
      res.status(201).json({
        message : `your follow request has been sent to ${followeeUsername} successfully`,
        data : followRecord
      })
}
async function unfollowController(req,res) {
     const followerUsername = req.user.username
      const followeeUsername = req.params.username
      const Alreadyfollow = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
      })
      if(!Alreadyfollow){
        return res.status(200).json({
        message : "Already Unfollowed "
      })
      }
      const deleteRecord = await followModel.deleteOne({
        follower : followerUsername,
        followee : followeeUsername})
      res.status(200).json({
        message : "Unfollowed successfully",
        data : deleteRecord
      })
}
async function followAcceptController(req,res) {
  const followerUsername = req.user.username
  const followeeUsername = req.params.username
  const request = await followModel.findOne({
    follower : followerUsername,
    followee : followeeUsername,
    status : "pending"
  })
  if(!request){
    return res.status(404).json({
      message : "No pending request found"
    })}
  // if(request.status === "accepted"){
  //   res.status(409).json({
  //     message : "Your request already accepted"
  //   })
  // }
  request.status = "accepted"
  request.save()
  res.json({
    message : "request accepted",
    request
  })
 
}
async function followRejectController(req,res) {
  const followerUsername = req.user.username
  const followeeUsername = req.params.username
  
  const request = await followModel.findOne({
    follower : followerUsername,
    followee : followeeUsername,
    status : "pending"
  })
    if(!request){
    return res.status(404).json({
      message : "No pending request found"
    })}
  // if(request.status === "rejected"){
  //   res.status(409).json({
  //     message : "Your request already rejected"
  //   })
  // }
  request.status = "rejected"
  request.save()
  res.json({
    message : "request rejected",
    request
  })
 
}
async function getFollowDataController(req,res) {
   const loggedInUser = req.user.username;
  const followers = await followModel.find({
    followee: loggedInUser,
    status: "accepted"
  });

   const following = await followModel.find({
    follower: loggedInUser,
    status: "accepted"
  });

   const followingUsernames = following.map(e => e.followee);
  const followerUsernames = followers.map(e => e.follower);

  const others = await userModel.find({
    username: {
      $nin: [...followingUsernames, ...followerUsernames, loggedInUser]
    }
  });

  res.json({ followers, following, others });


}
module.exports = {
    followController,
    unfollowController,
    followAcceptController,
    followRejectController,
    getFollowDataController
}

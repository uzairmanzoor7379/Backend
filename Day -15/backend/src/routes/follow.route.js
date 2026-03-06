const express = require('express');
const identifyUser = require('../middlewares/identify.middleware');
const { followController, unfollowController, followAcceptController, followRejectController, getFollowDataController } = require('../controllers/follow.controller');
const followRouter = express.Router()




// /api/user/follow/:username
followRouter.post("/follow/:username",identifyUser,followController)
// /api/user/unfollow/:username
followRouter.delete("/unfollow/:username",identifyUser,unfollowController)
// /api/user/follow-accept/:username
followRouter.patch('/follow-accept/:username',identifyUser,followAcceptController)
// /api/user/follow-accept/:username
followRouter.patch('/follow-reject/:username',identifyUser,followRejectController)
// /api/user/follow/data
followRouter.get('/follow/data',identifyUser , getFollowDataController)
module.exports = followRouter;
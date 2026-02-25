const express = require('express');
const identifyUser = require('../middlewares/identify.middleware');
const { followController, unfollowController, followAcceptController, followRejectController } = require('../controllers/follow.controller');
const followRouter = express.Router()




// /api/user/follow/:username
followRouter.post("/follow/:username",identifyUser,followController)
// /api/user/unfollow/:username
followRouter.delete("/unfollow/:username",identifyUser,unfollowController)
// /api/user/follow-accept/:username
followRouter.patch('/follow-accept/:username',identifyUser,followAcceptController)
// /api/user/follow-accept/:username
followRouter.patch('/follow-reject/:username',identifyUser,followRejectController)
module.exports = followRouter;
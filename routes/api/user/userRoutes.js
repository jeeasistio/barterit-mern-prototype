//basic router imports
const  { Router } = require('express');
const router = Router();

//middleware
const requireAuth = require('../../../middlewares/requireAuth');

//controller imports
const userControllers = require('../../../controllers/userControllers');

router.get('/:userId', userControllers.user_get);
router.post('/forgot-password', userControllers.forgotPassword_post);
router.get('/:userId/reset-password/:token', userControllers.resetPassword_get);
router.post('/:userId/reset-password/:token', userControllers.resetPassword_post);

//profile
router.post('/change-picture', requireAuth, userControllers.changePicture_post);

module.exports = router;
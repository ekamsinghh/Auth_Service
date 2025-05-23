const express = require('express')
const router = express.Router();
const {validateUserAuth, validateIsAdminRequest}= require('../../middlewares/index');
const userController = require('../../controllers/user-controller');

router.post('/signup', validateUserAuth , userController.create);
// router.delete('/deleteuser/:id', userController.destroy);
router.post('/signin', validateUserAuth , userController.signIn);
router.get('/isAuthenticated', userController.isAuthenticated);

router.get('/isAdmin',validateIsAdminRequest, userController.isAdmin);
module.exports= router;
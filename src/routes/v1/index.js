const express = require('express')
const router = express.Router();

const userController = require('../../controllers/user-controller');

router.post('/signup', userController.create);
router.delete('/deleteuser/:id', userController.destroy);

module.exports= router;
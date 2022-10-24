import express from 'express';
import middleware from '../middleware/index';
import UserController from '../../controllers/user';

const router = express.Router();
const validator = middleware.userValidator;

export default(app)=>{

	app.use('/user', router);

	router.post('/register', validator.verifyRegistration(),validator.validate, UserController.register);
	router.post('/login', validator.verifyLogin(), validator.validate, UserController.login);
	router.get('/me', middleware.auth, UserController.getMe);

};









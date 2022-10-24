import express from 'express';
import AuthController from '../../controllers/auth';
import m from '../middleware/index';


const router = express.Router();

export default(app)=>{

	app.use('/auth', router);

	router.post('/refresh_token', AuthController.refreshToken);

	router.post('/test', m.auth, (req,res)=>{

		res.send("Authorized Test!").end();
	});
};
import express from 'express';
import user from './routes/user';
import room from './routes/room';
import auth from './routes/auth';
import path from 'path';

const router = express.Router();

export default()=>{

	user(router);
	room(router);
	auth(router);

	return router;
};
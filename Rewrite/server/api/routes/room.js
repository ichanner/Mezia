import express from 'express';
import middleware from '../middleware/index';
import RoomController from '../../controllers/room';

const router = express.Router();

export default (app)=>{

	app.use('/room', router);

	router.post('/create', middleware.auth, RoomController.create);
	router.post('/add_client', middleware.auth, RoomController.addClient);
	router.get('/clients', middleware.auth, RoomController.getClients);
	router.post('/change_peers', middleware.auth, RoomController.changePeers);
	router.get('/my_client', middleware.auth, RoomController.getMyClient);
};
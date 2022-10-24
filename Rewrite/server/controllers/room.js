import roomService from '../services/room';

const RoomService = new roomService();

export default{

	create: async function(req, res, next){

		try{		

			const {room_record} = await RoomService.create(req.user);

			res.status(200).json({room_record: room_record});
		}
		catch(e){

			next(e);
		}
	},

	addClient: async function(req, res, next){

		try{

			await RoomService.addClient(
			
				req.body.roomId, 
				req.user
			);

			res.status(200).end();
		}
		catch(e){

			next(e);
		}
	},

	getMyClient: async function(req, res, next){

		try{

			const {client_record} = await RoomService.getMyClient(req.user);

			res.status(200).json({client_record: client_record});
		}
		catch(e){

			next(e);
		}
	},

	getClients: async function(req, res, next){

		try{

			console.log(req.body.roomId);

			const {clients} = await RoomService.getClients(req.user);

			res.status(200).json({clients: clients});
		}
		catch(e){


			console.error(e);
			//next(e);
		}
	},

	changePeers: async function(req, res, next){

		try{

			await RoomService.changePeers(req.user);

			res.status(200).end();
		}
		catch(e){

			next(e);
		}
	}

};


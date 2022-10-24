import roomService from '../../services/room';
import clientService from '../../services/client';

const ClientService = new clientService();
const RoomService = new roomService();

export default{

	join: function(socket, io, data){

		try{

			socket.join(data.roomId);

			ClientService.updateSocketId(socket.user, socket.id);

			io.sockets.in(data.roomId).emit('/room/join', data);
		}
		catch(e){

			throw new Error(e);
		}
	}
};
import connect from 'socket.io';
import authService from '../services/auth';
import registerListeners from '../subscribers/socket/index';
import middleware from '../api/middleware/socket/';

const AuthService = new authService();

export default(server)=>{

	const io = connect(server);

	io.on('connection', function(socket){

		io.use(middleware.auth);

		registerListeners(socket, io);
	});
};




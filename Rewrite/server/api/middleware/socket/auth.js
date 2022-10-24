import authService from '../../../services/auth';

const AuthService = new authService();

export default async function(socket, next){

	try{

		const header = socket.handshake.headers['authorization'];

		const token = header.split(' ')[1];

		const user = await AuthService.verifyAccessToken(token);

		socket.user = user.user.user;
	}
	catch(e){

		next(new Error('Unauthorized!'));
	}

	next();
};
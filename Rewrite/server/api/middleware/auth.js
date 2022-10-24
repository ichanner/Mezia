import HttpError from '../../helpers/error';
import authService from '../../services/auth';

const AuthService = new authService();

export default async(req,res,next)=>{

	try{

		const header = req.headers['authorization'];

		const token = header.split(' ')[1];

		if(token == null) throw new HttpError(401);

		const user = await AuthService.verifyAccessToken(token);

		if(user != null){

			if(user.user != null){

				console.log(user);
				console.log(user.user);
			

				req.user = user.user.user;
			}
		}
	}
	catch(e){

		next(e);
	}

	next();
};	
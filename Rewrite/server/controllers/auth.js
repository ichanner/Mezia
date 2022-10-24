import authService from '../services/auth';
import HttpError from '../helpers/error';

const AuthService = new authService();

export default{

	refreshToken: async function(req, res, next){

		try{

			const token = req.cookies['jwt'];

			if(token == null) throw new HttpError(401);

			const {access_token} = await AuthService.refreshToken(token);

			res.status(200).json({access_token: access_token});
		}
		catch(e){

			next(e);
		}
	}
};
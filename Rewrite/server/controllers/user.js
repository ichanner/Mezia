import config from '../configuration/';
import userService from '../services/user';

const UserService = new userService();

export default{

	register: async function(req, res, next){

		try{

			const {user_record} = await UserService.register(
					
				req.body.username, 
				req.body.password, 
				req.body.email
			);

			res.status(200).json({user_record: user_record});

		}
		catch(e){

			next(e);
		}
	},


	login: async function(req, res, next){

		try{

			const {access_token, refresh_token} = await UserService.login(
			
				req.body.username,
				req.body.password		
			);

			res.cookie("jwt", refresh_token,{
			
				httpOnly: true,
				path: config.api.prefix_v1 + "/auth/refresh_token"
			});
			
			res.status(200).json({
	
				access_token: access_token
			});

		}
		catch(e){

			next(e);
		}
	},

	getMe: async function(req, res, next){

		try{

			const {user_record} = await UserService.getMe(req.user);

			res.status(200).json({

				user_record: user_record
			});
		}
		catch(e){

			next(e);
		}
	}
};
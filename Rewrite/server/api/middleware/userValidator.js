import userService from '../../services/user';
import HttpError from '../../helpers/error';
import {body, validationResult} from 'express-validator';

const UserService = new userService();

export default{

	verifyRegistration: function(){
		
		return [

			body('username')

				.not().isEmpty().withMessage("Username is required!"),
			
			body('password')

				.isLength({min: 3, max: 20}).withMessage("Password must be between 3-20 characters!")
			
				.not().isEmpty().withMessage("Password is required!"),
			
			body('confirm')
				
				.custom(async(confirm, {req})=>{

					if(confirm != req.body.password){

						throw new Error("Passwords must match!");
					}
				})
			
				.not().isEmpty().withMessage("Confirmation Password is required!"),
			
			body('email')

				.isEmail().withMessage("Email must be valid!")
				
				.optional({checkFalsy: true})
				
				.custom(async(email) => {

					if(email != null){

						const user = await UserService.findUserEmail(email);

						if(user){

							throw new Error("Email has already been registered!");
						}
					}
			
				})
		]	

	},

	verifyLogin: function(){

		return [

			body('username')
				.not().isEmpty().withMessage("Username is required!"),
			body('password')
				.not().isEmpty().withMessage("Password is required!")
		]

	},

	validate: function(req, res, next){

		const errors = validationResult(req);

		if(!errors.isEmpty()){

			const err = new HttpError(422, errors);

			next(err);
		}
		else{

			next();
		}
	}
};
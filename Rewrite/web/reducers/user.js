import {GET_ME, LOGIN_USER, REGISTER_USER, USER_ERROR} from '../config/actionTypes';

export default(state=null, action)=>{

	switch(action.type){

		case LOGIN_USER:

			state = action.payload;

			break;

		case REGISTER_USER:

			state = action.payload;

			break;

		case GET_ME:

			state = action.payload;

			break;

		case USER_ERROR:

			state = action.payload;

			break;

	}

	return state;

};
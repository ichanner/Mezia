import {REFRESH_TOKEN, SET_TOKEN, AUTH_ERROR} from '../config/actionTypes';

export default(state=null, action)=>{

	switch(action.type){

		case REFRESH_TOKEN:

			state = action.payload;

			break;

		case SET_TOKEN:

			state = action.payload;

			break;

		case AUTH_ERROR:

			state = action.payload;

			break;
	}

	return state;

};
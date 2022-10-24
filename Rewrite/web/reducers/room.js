import {CREATE_ROOM, ADD_ROOM_CLIENT, GET_CLIENTS, GET_MY_CLIENT, CHANGE_PEERS, ROOM_ERROR} from '../config/actionTypes';

export default(state=null, action)=>{

	switch(action.type){

		case CREATE_ROOM:

			state = action.payload;

			break;

		case GET_MY_CLIENT:

			state = action.payload;

			break;

		case GET_CLIENTS:

			state = action.payload;

			break;

		case CHANGE_PEERS:

			state = action.payload;

			break;

		case ADD_ROOM_CLIENT:

			state = action.payload;

			break;

		case ROOM_ERROR:

			state = action.payload;

			break;
	}

	return state;

};
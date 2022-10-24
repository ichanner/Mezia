import {CREATE_ROOM, ADD_ROOM_CLIENT, GET_MY_CLIENT, GET_CLIENTS, CHANGE_PEERS, ROOM_ERROR} from '../config/actionTypes';

export const create_room = (data) =>{

	return {

		type: CREATE_ROOM,
		payload: {

			data: data,
			err: null
		}
	}
};

export const add_client = (data) =>{

	return {

		type: ADD_ROOM_CLIENT,
		payload: {

			data: data,
			err: null
		}
	}
};

export const get_my_client = (data)=>{

	return{

		type: GET_MY_CLIENT,
		payload: {

			data: data,
			err: null
		}
	}

};

export const get_clients = (data)=>{

	return {

		type: GET_CLIENTS,
		payload: {

			data: data,
			err: null
		}
	}
};

export const change_peers = (data)=>{

	return {

		type: CHANGE_PEERS,
		payload: {

			data: data,
			err: null
		}
	}
};

export const room_error = (err) =>{

	return {

		type: ROOM_ERROR,
		payload: {

			data: null,
			err: err
		}
	}
}
import {axiosClient} from './index';
import {ROOM_CREATE_ENDPOINT, ROOM_ADD_CLIENT_ENDPOINT, GET_CLIENTS_ENDPOINT, GET_MY_CLIENT_ENDPOINT, CHANGE_PEERS_ENDPOINT} from '../../config/endpoints';
import {create_room, add_client, get_clients, get_my_client, change_peers, room_error} from '../../actions/room';

export const addClient = (data)=>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.post(ROOM_ADD_CLIENT_ENDPOINT, data)

			return dispatch(add_client(res.data));
		}
		catch(e){

			return dispatch(room_error(e.response));
		}
	}

};

export const createRoom = ()=>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.post(ROOM_CREATE_ENDPOINT);

			return dispatch(create_room(res.data));
		}
		catch(e){

			return dispatch(room_error(e.response));
		}	
	}
};

export const getClients = () =>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.get(GET_CLIENTS_ENDPOINT);

			return dispatch(get_clients(res.data));
		}
		catch(e){

			return dispatch(room_error(e.response));
		}
	}

};

export const getMyClient = () =>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.get(GET_MY_CLIENT_ENDPOINT);

			return dispatch(get_my_client(res.data));
		}
		catch(e){

			return dispatch(room_error(e.response));
		}
	}
};

export const changePeers = () =>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.post(CHANGE_PEERS_ENDPOINT);

			return dispatch(change_peers(res.data));
		}
		catch(e){

			return dispatch(room_error(e.response));
		}
	}
};
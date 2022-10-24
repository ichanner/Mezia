import {refreshToken} from '../api/auth';
import expired from '../../utils/expiredToken';
import {getToken} from '../../utils/accessToken';
import connect from "socket.io-client";
import {WEBSOCKET_URL} from '../../config/endpoints';


function getSocket(token){

	return connect(WEBSOCKET_URL, {

		transportOptions:{

			polling:{

				extraHeaders: {"Authorization": "Bearer " + token},
			},
		},
	});	
}

export const emit = async(event, data)=>{

	const token = getToken();

	if(expired(token)){

		await refreshToken();
	}
	
	getSocket(token).emit(event, data);
};

export const on = async(event, data)=>{

	console.log(event + " Incoming!");
};
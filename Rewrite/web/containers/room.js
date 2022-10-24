import {addClient, getClients, getMyClient, changePeers} from '../services/api/room';
import {getMe} from '../services/api/user';

export const mapStateToProps = (state)=>{

	return{

		room: state.room,
		user: state.user
	}
};

export const mapDispatchToProps = ()=>{

	return {addClient: addClient, getClients: getClients, getMyClient: getMyClient, changePeers: changePeers, getMe: getMe};
};
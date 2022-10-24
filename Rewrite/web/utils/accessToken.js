import store from '../store/index';
import {set_token} from '../actions/auth';

export const setToken = (token)=>{	

	const data = {access_token: token};

	store.dispatch(set_token(data));
}

export const getToken = ()=>{

	const state = store.getState().auth;

	if(state == null){

		return null;
	}
	else{

		return state.data;
	}
}
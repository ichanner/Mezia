import {REFRESH_TOKEN, SET_TOKEN, AUTH_ERROR} from '../config/actionTypes';

export const refresh_token = (data) =>{

	return {

		type: REFRESH_TOKEN,
		payload: {

			data: data,
			err: null
		}
	}
};

export const set_token = (data)=>{

	return {

		type: SET_TOKEN,
		payload: {

			data: data,
			err: null
		}
	}
}

export const auth_error = (err) =>{

	return{

		type: AUTH_ERROR,
		payload: {

			data: null,
			err: err
		}
	}
};




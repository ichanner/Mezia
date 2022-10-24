import {GET_ME, LOGIN_USER, REGISTER_USER, USER_ERROR} from '../config/actionTypes';

export const register_user = (data) =>{

	return{

		type: REGISTER_USER,
		payload: {

			data: data,
			err: null
		}
	}
};

export const login_user = (data) =>{

	return{

		type: LOGIN_USER,
		payload: {

			data: data,
			err: null
		}
	}
};

export const get_me = (data) =>{

	return{

		type: GET_ME,
		payload: {

			data: data,
			err: null
		}
	}

};

export const user_error = (err) =>{

	return{

		type: USER_ERROR,
		payload: {

			data: null,
			err: err
		}
	}
};


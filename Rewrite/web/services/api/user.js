import {axiosClient} from './index';
import {GET_ME_ENDPOINT, REGISTER_USER_ENDPOINT, LOGIN_USER_ENDPOINT} from '../../config/endpoints';
import {register_user, get_me, login_user, user_error} from '../../actions/user';

export const registerUser = (data) =>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.post(REGISTER_USER_ENDPOINT, data);

			return dispatch(register_user(res.data));
		}
		catch(e){

			return dispatch(user_error(e.response));
		}
	}
};

export const loginUser = (data) =>{

	return async(dispatch)=>{
		
		try{

			const res = await axiosClient.post(LOGIN_USER_ENDPOINT, data);

			return dispatch(login_user(res.data));
		}
		catch(e){

			return dispatch(user_error(e.response));
		}
	}
};

export const getMe = () =>{

	return async(dispatch)=>{

		try{

			const res = await axiosClient.get(GET_ME_ENDPOINT);

			return dispatch(get_me(res.data));
		}
		catch(e){

			return dispatch(user_error(e.response));
		}
	}
}
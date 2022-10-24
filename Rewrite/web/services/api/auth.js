import {axiosClient} from './index';
import {REFRESH_TOKEN_ENDPOINT} from '../../config/endpoints';
import store from '../../store/index';
import {refresh_token, auth_error} from '../../actions/auth';


export const refreshToken = async() =>{

	try{

		const res = await axiosClient.post(REFRESH_TOKEN_ENDPOINT, {withCredentials: true});

		return store.dispatch(refresh_token(res.data.access_token));

	}
	catch(err){

		return store.dispatch(auth_error(err.response));
	}
}


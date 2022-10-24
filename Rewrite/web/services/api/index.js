import axios from 'axios';
import store from '../../store/index';
import {BASE_URL} from '../../config/endpoints';
import {refreshToken} from './auth';
import {getToken} from '../../utils/accessToken';


export const axiosClient = axios.create({

	baseUrl: BASE_URL,
	headers:{

		'Accept': 'application/json',
    	'Content-Type': 'application/json'
	}
});

export const initAPI = (axios) =>{

	axios.interceptors.request.use(

		function(config){

			config.headers['Authorization'] = 'Bearer ' + getToken();

			return config;

		}, function(error){

			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(

		function(response){

			return response;

		}, async function(error){

			const request = error.config;

			if(error.response.status == 403 && !request._retry){

				request._retry = true;

				await refreshToken();

				axios.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();

				return axios(request);			
			}

			return Promise.reject(error);
		}
	);
};
import {combineReducers} from 'redux';
import authReducer from '../reducers/auth';
import roomReducer from '../reducers/room';
import userReducer from '../reducers/user';

export default combineReducers({

	user: userReducer,
	auth: authReducer,
	room: roomReducer
});


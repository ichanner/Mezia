import {createRoom} from '../services/api/room';

export const mapStateToProps = (state)=>{

	return{

		room: state.room
	}
};

export const mapDispatchToProps = ()=>{

	return {createRoom: createRoom};
};
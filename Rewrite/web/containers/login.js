import {loginUser} from '../services/api/user';

export const mapStateToProps = (state)=>{

	return{

		user: state.user
	}
};

export const mapDispatchToProps = ()=>{

	return {loginUser: loginUser};
};
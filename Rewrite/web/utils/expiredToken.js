import decode from 'jwt-decode';

export default (token)=>{

	try{

		const {exp} = decode(token);

		if(Date.now() >= exp*1000){

			return true;
		}
		else{

			return false;
		}
	}
	catch(e){

		return true;
	}
}

export default(err)=>{

	const errors = err.data.error.errors;

	let errorList = [];

	for(var i = 0; i < errors.length; i++){
		
		errorList[errors[i].param] = errors[i].msg;	
	}

	return errorList;
}
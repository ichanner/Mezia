
export default class Error{

	constructor(status, message = null){

		this.message = message;
		this.status = status;

	}
}
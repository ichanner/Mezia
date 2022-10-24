import mongodb from 'mongoose';
import shortid from 'shortid';

var Schema = mongodb.Schema;

var userSchema = new Schema({

	_id: {type: String, default: shortid.generate},
	username: String,
	password: String,
	salt: String,
	email: {type: String, default: null},
	roomId: {type: String, default: String},
	date: {type: Date, default: Date.now}

});

export default mongodb.model('User', userSchema);
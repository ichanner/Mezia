import mongodb from 'mongoose';
import shortid from 'shortid';

var Schema = mongodb.Schema;

var tokenSchema = new Schema({

	_id: {type: String, default: shortid.generate},
	token: String,
	user: String,
	date: {type: Date, default: Date.now}

});

export default mongodb.model('Token', tokenSchema);

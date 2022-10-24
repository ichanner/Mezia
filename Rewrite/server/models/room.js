import mongodb from 'mongoose';
import shortid from 'shortid';

var Schema = mongodb.Schema;

var roomSchema = new Schema({

	_id: {type: String, default: shortid.generate},
	creatorId: String,
	clients: [String],
	date: {type: Date, default: Date.now}

});

export default mongodb.model('Room', roomSchema);
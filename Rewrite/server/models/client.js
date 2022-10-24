import mongodb from 'mongoose';
import shortid from 'shortid';

var Schema = mongodb.Schema;

var clientSchema = new Schema({

	_id: {type: String, default: shortid.generate},
	userId: String,
	roomId: String,
	role: Number,
	peerId: {type: String, default: shortid.generate},
	socketId: {type: String, default: null},
	date: {type: Date, default: Date.now}

});

export default mongodb.model('Client', clientSchema);
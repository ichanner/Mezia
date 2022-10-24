import config from '../configuration/';
import mongoLoader from './mongo';
import expressLoader from './express';
import socketLoader from './socket-io';

export default async(app, server)=>{

	await expressLoader(app, server);
	
	await socketLoader(server);
	
	await mongoLoader(config.mongodb.mezia.url);
};


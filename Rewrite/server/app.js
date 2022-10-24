
import express from 'express';
import http from 'http';
import config from './configuration/';
import loaders from './loaders/';

const app = express();

async function startServer(port){

	const server = http.createServer(app);

	await loaders(app, server);

	server.listen(port, err=> {

		if(err) throw new Error(err);

  		console.log('listening on port 3001');
	})
}

startServer(config.server.port);



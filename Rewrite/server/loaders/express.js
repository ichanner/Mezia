import express from 'express';
import config from '../configuration/';
import cors from 'cors';
import path from 'path';
import HttpError from '../helpers/error';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import api from '../api/index';

export default (app, server)=>{

	app.get('/status', (req,res)=>{

		res.status(200).end();
	})

	app.head('/status', (req,res)=>{

		res.status(200).end();
	})

	app.enable('trust proxy');

	app.use(bodyParser.urlencoded({ extended: false }));
	
	app.use(express.json());
	
	app.use(cookieParser());
	
	app.use(cors());
	
	app.use(config.api.prefix_v1, api());

	app.use(express.static(path.join(__dirname, config.assets.build)));


	app.get('*', function(req, res) {

		res.sendFile('index.html', {root: path.join(__dirname, config.assets.build)});
	})

	const { PeerServer } = require('peer');

	PeerServer({ port: 443, path: '/peerjs' });

	app.use((req, res, next)=>{

		const err = new HttpError(404, "Not Found!");

		next(err);
	})


	app.use((err, req, res, next) => {
		
		if(err.name == 'UnauthorizedError'){

			return res.status(err.status).json({

				error: err.message
			});
		}

		next(err);
	})

	
	app.use((err, req, res, next) => {
		
		res.status(err.status || 500).json({

			error: err.message || "An Error Has Occured!"
		});
	})
};
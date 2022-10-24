import React, {Component} from 'react';
import Routes from './routes/index';
import {initAPI, axiosClient} from '../services/api/index';
import {refreshToken} from '../services/api/auth';

export default class App extends Component{


	constructor(props){

		super(props);

		this.state = {

			loading: true
		};
	}

	componentDidMount(){

		refreshToken().then(()=>{

			initAPI(axiosClient);

			this.setState({loading: false});
		});
	}

	render(){

		if(this.state.loading){

			return(<h1> loading... </h1>);
		}

		return(	

			<div className="app">
				
				<Routes/>
				
			</div>

		);
	}
}

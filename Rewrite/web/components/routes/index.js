import React, {Component} from 'react';
import {browserHistory, BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../../store/index';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Create from '../views/Create';
import Room from '../views/Room';

export default class Router extends Component{

	render(){

		return(

			<Provider store={store}>
				
				<BrowserRouter>

					<div>

						<Switch>


								<Route exact path='/' component={Home}/>
								<Route exact path='/login' component={Login}/>
								<Route exact path='/register' component={Register}/>
								<Route exact path='/create' component={Create}/>
								<Route exact path='/room/:id' component={Room}/>
							

						</Switch>

					</div>

				</BrowserRouter>

			</Provider>

		);
	}
}
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import SubmitButton from '../elements/SubmitButton';
import InputField from '../elements/InputField';
import ErrorText from '../elements/ErrorText';
import extractErrors from '../../utils/extractInputErrors';
import {setToken} from '../../utils/accessToken';
import {mapStateToProps, mapDispatchToProps} from '../../containers/login';

class Login extends Component{
			
	constructor(props){

		super(props);

		this.state = {

			username: "",
			password: "",

			errors:{

				form: "",
				username: "",
				password: ""
			}
		}
	}

	render(){

		const login = (e) =>{

			 e.preventDefault();

			 this.props.loginUser(this.state);
		}

		const handleInput = (e)=>{

			this.setState({[e.target.name]: e.target.value});
		}

		if(this.props.user != null){

			if(this.props.user.err != null){

				const err = this.props.user.err;

				if(err.status != 422){

					if(err.status == 401){
						
						this.setState({errors: {form: "Invalid username or password"}});			
					}
					else{

						this.setState({errors: {form: "Unable to Login!"}});		
					}
				}
				else{

					const errorList = extractErrors(err);

					this.setState({

						errors: errorList
					})
				}

				this.props.user.err = null;	
			}

			if(this.props.user.data != null){

				const token = this.props.user.data.access_token;

				setToken(token);

				window.location.href = '/';
			}

		}
	
		return(

			<div className="Login">

				<h2> Login! </h2>

				<ErrorText message={this.state.errors.form}/>

				<form onSubmit={(e) => login(e)}>

					<InputField 
						type="text" 
						placeholder="Username" 
						name="username" 
						value={this.state.username} 
						onChange={handleInput}
					/>

					<ErrorText message={this.state.errors.username}/>
					
					<InputField 
						type="password" 
						placeholder="Password" 
						name="password" 
						value={this.state.password} 
						onChange={handleInput}
					/>

					<ErrorText message={this.state.errors.password}/>
					
					<SubmitButton value="Login"/>

				</form>

			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps())(Login);
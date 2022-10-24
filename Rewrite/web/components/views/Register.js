import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import InputField from '../elements/InputField';
import SubmitButton from '../elements/SubmitButton';
import ErrorText from '../elements/ErrorText';
import extractErrors from '../../utils/extractInputErrors';
import {mapStateToProps, mapDispatchToProps} from '../../containers/register';

class Register extends Component{

	constructor(props){

		super(props);

		this.state = {

			username: "",
			password: "",
			confirm: "",
			email: "",

			errors:{

				form: "",
				username: "",
				password: "",
				confirm: "", 
				email: ""
			}
		}
	}


	render(){

		const register = (e) =>{

			e.preventDefault();

			this.props.registerUser(this.state);
		}

		const handleInput = (e)=>{

			this.setState({[e.target.name]: e.target.value});
		}

		if(this.props.user != null){

			if(this.props.user.err != null){

				const err = this.props.user.err;

				if(err.status != 422){

					this.setState({errors: {form: "Unable to Create Account!"}});	
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

				return(<Redirect to='/'/>);
			}
		}
	
		return(

			<div className="Register">

				<h2> Register! </h2>

				<ErrorText message={this.state.errors.form}/>

				<form onSubmit={(e)=> register(e)}>

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
	

					<InputField 
						type="password" 
						placeholder="Confirm Password" 
						name="confirm" 
						value={this.state.confirm} 
						onChange={handleInput}
					/>
					
					<ErrorText message={this.state.errors.confirm}/>

					<InputField 
						type="text" 
						placeholder="Email (Optional)" 
						name="email" 
						value={this.state.email} 
						onChange={handleInput}
					/>

					<ErrorText message={this.state.errors.email}/>

					<SubmitButton value="Register"/>

				</form>

			</div>

		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps())(Register);
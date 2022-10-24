import React, {Component} from 'react';


export default class ErrorText extends Component{


	render(){

		return(

			<div className="ErrorText">

				<span> {this.props.message} </span>

			</div>

		);
	}

}
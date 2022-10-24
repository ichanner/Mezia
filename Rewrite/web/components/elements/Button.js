import React, {Component} from 'react';


export default class SubmitButton extends Component{


	render(){

		return(

			<div className="Button">

				<button onClick={this.props.onClick}> {this.props.text} </button>

			</div>

		);
	}

}
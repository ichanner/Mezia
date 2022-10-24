import React, {Component} from 'react';


export default class SubmitButton extends Component{


	render(){

		return(

			<div className="SubmitButton">

				<input 
					type="submit" 
					value={this.props.value}
				/>

			</div>

		);
	}

}
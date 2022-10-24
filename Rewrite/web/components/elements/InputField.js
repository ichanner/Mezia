import React, {Component} from 'react';


export default class InputField extends Component{


	render(){

		return(

			<div className="InputField">

				<input 
					type={this.props.type} 
					placeholder={this.props.placeholder} 
					name={this.props.name}  
					onChange={this.props.onChange} 
					value={this.props.value}
					autocomplete="off"
				/>

			</div>

		);
	}

}
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import ErrorText from '../elements/ErrorText';
import {connect} from 'react-redux';
import Button from '../elements/Button';
import {mapStateToProps, mapDispatchToProps} from '../../containers/create';

class Create extends Component{

	constructor(props){

		super(props);

		this.state = {

			errors:{

				form: ""
			}
		};
	}

	render(){

		const createRoom = ()=>{

			this.props.createRoom();
		}

		if(this.props.room != null){

			if(this.props.room.err != null){

				const err = this.props.room.err;

				if(err.status != 422){

					this.setState({errors: {form: "Unable to create room!"}});
				}

				this.props.room.err = null;
			}
			else if(this.props.room.err == null){

				const roomId = this.props.room.data.room_record._id;

				return(<Redirect to={"/room/"+roomId}/>);
			}
		}

		return(

			<div className="Create">

				<h2> Create a room! </h2>

				<ErrorText message={this.state.errors.form}/>

				<Button onClick={() => createRoom()} text="Create Room"/>

			</div>

		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps())(Create);
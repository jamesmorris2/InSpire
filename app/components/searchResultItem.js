import React from 'react';
import Modal from './modal';
import ClassInfo from './classInfo';

export default class SearchResultItem extends React.Component {
	constructor(props) {
		super(props);

		var newState = props.data;
		newState.moreInfo = false;
		this.state = newState;
	}

	handleChevronClick(clickEvent) {
		clickEvent.preventDefault();

		if(clickEvent.button === 0) {
			this.setState({moreInfo: !this.state.moreInfo});
		}
	}

	render() {
		var data = this.state;
		var body;
		var chevron;
		var modalId = "ResultModal" + this.props.id;

		if(this.state.moreInfo) {
			chevron = <span className="glyphicon glyphicon-chevron-down pull-right"></span>;
			body = (
				<div>
					<br />
					{data.description}
					<br />
					<a className="btn" data-toggle="modal" href={"#" + modalId} style={{textAlign: 'right'}}>...More info</a>
				</div>
			);
		} else {
			chevron = <span className="glyphicon glyphicon-chevron-left pull-right"></span>;
		}

		return (
			<li className="list-group-item">
				<Modal id={modalId}><ClassInfo data={data}/></Modal>
				<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
				{data.courseId} - {data.courseName} <a href="#" onClick={(e) => this.handleChevronClick(e)}>{chevron}</a>
				{body}
			</li>
		);
	}
}
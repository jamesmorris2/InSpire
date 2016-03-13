import React from "react";
import SearchResultItem from './searchResultItem';

export default class SearchResultList extends React.Component {
	constructor(props){
		super(props);

		this.state = {results: props.data};
	}

	handleBackClick(clickEvent) {
		clickEvent.preventDefault();

		if(clickEvent.button === 0) {
			this.props.setPanelView('search');
		}
	}

	render() {
		var data = this.state;
		return (
			<div className="panel panel-default" id="search-results">
				<div className="panel-heading" style={{color: '#354066'}}>
					<a href="#" onClick={(e) => this.handleBackClick(e)}>
						<span className="glyphicon glyphicon-chevron-left" style={{color: '#354066'}}></span>
					</a> Search Results
				</div>
				<ul className="list group">
					{data.results.map((result, i) => {
						return <SearchResultItem key={i} id={i} data={result} />
					})}
				</ul>
			</div>
		);
	}
}

// <li className="list-group-item">
// 	<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
// 	CS 326 - Web Programming <span className="glyphicon glyphicon-chevron-down pull-right"></span>
// 	<br />
// 	<br />
// 	THIS IS A COOL CLASS. TRUST ME.
// 	<a className="btn" data-toggle="modal" href="#CS326Modal" style={{textAlign: 'right'}}>...More info</a>
// </li>
// <li className="list-group-item">
// 	<span className="glyphicon glyphicon-play class-full-btn" style={{color: 'blue'}}></span>
// 	CS 320 - Software Engineering <span className="glyphicon glyphicon-chevron-right pull-right"></span>
// </li>
// <li className="list-group-item">
// 	<span className="glyphicon glyphicon-stop" style={{color: 'yellow'}}></span>
// 	CS 373 - Intro. to Computer Graphics <span className="glyphicon glyphicon-chevron-right pull-right"></span>
// </li>
// <li className="list-group-item">
// 	<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
// 	CS 383 - Artificial Intelligence <span className="glyphicon glyphicon-chevron-right pull-right"></span>
// </li>
// <li className="list-group-item">
// 	<SearchResultItem id={1} />
// </li>
// <li className="list-group-item">
// 	<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
// 	CS 311 - Algorithms <span className="glyphicon glyphicon-chevron-right pull-right"></span>
// </li>
// <li className="list-group-item">
// 	<span className="glyphicon glyphicon-asterisk" style={{color: 'green'}}></span>
// 	CS 365 - Digital Forensics <span className="glyphicon glyphicon-chevron-right pull-right"></span>
// </li>

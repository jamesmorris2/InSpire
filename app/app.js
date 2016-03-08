import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendarBlock';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import ClassInfo from './components/classInfo';
import SearchResults from './components/searchResults'

class App extends React.Component {
	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Calendar}/>
			<Route path="/profile/:id" component={Calendar} />
		</Route>
	</Router>
),document.getElementById('calendar'));

// ReactDOM.render(
// 	<ClassInfo />,
// 	document.getElementById('class-info-modal')
// );

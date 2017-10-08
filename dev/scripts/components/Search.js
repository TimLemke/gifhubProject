import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.findRandomGif = this.findRandomGif.bind(this);
		this.state = {
			searchQuery: '',
			};
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.startSearch(this.state.searchQuery);
	}

	findRandomGif() {
		this.props.searchRandom();
	}

	render() {
		return (
			<div className="searchForm">
				<form onSubmit={this.handleSubmit}>
					<input className="formInput" type="search" placeholder="Search for a Gif!" onChange={(e) => this.setState({ searchQuery: e.target.value})}/>
					<input className="formSubmit" type="submit" value="Search!"/>
				</form>
				<button className="randomSearch" type="submit" onClick={this.findRandomGif}>Surprise Me!</button>
			</div>
			)
		}
	}


export default Search;
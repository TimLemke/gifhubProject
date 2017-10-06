import React from 'react';
import ReactDOM from 'react-dom';


import Header from './components/Header.js';
import Search from './components/Search.js';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.searchGifs = this.searchGifs.bind(this);
		this.findRandomGif = this.findRandomGif.bind(this);
		this.state = {
			searchQuery: '',
			searchResults: [],
			randomGif: '',
		};
	}

	searchGifs(searchQuery) {
	fetch(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&limit=25&api_key=5ec81cbaf1b242b4a9297cbfa8db8cf1`).then(data => data.json())
	.then(response => {
		console.log(response.data);
		this.setState({
			searchResults: response.data,
		});
		});
	}

	findRandomGif() {
	fetch(`http://api.giphy.com/v1/gifs/random?api_key=5ec81cbaf1b242b4a9297cbfa8db8cf1`).then(data => data.json())
	.then(response => {
		console.log(response.data);
		this.setState({
			randomGif: response.data,
		});
	});
	}


	render() {
		let chosenGifs = Array.from(this.state.searchResults);
		let displayGifs = [];
		let GIFS = chosenGifs.map((item)=> {
			displayGifs.push({
				src: item.images.fixed_height.url,
				});
		});
		console.log(displayGifs);
		return (
			<div>
				<Header />
				<Search startSearch={this.searchGifs} searchRandom={this.findRandomGif}/>
			</div>
			)
		}
	}

ReactDOM.render(<App />, document.getElementById('app'));

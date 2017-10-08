import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Search from './components/Search.js';
import ResultList from './components/ResultList.js';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.searchGifs = this.searchGifs.bind(this);
		this.findRandomGif = this.findRandomGif.bind(this);
		this.collectFavorites = this.collectFavorites.bind(this);
		this.collectFeatureGif = this.collectFeatureGif.bind(this);
		this.state = {
			searchQuery: '',
			searchResults: [],
			randomGif: '',
			favoriteGifs: [],
			featureGif: {}
		};
	}

	searchGifs(searchQuery) {
	fetch(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&limit=25&api_key=5ec81cbaf1b242b4a9297cbfa8db8cf1`).then(data => data.json())
	.then(response => {
		this.setState({
			searchResults: response.data,
			dataIsLoading: false
			});
		});

	// let getData = $.ajax({
	// 	url: `https://api.giphy.com/v1/gifs/search?`,
	// 		data: {
	// 		api_key: `5ec81cbaf1b242b4a9297cbfa8db8cf1`,
	// 		q: `${searchQuery}`,
	// 		limit: 20
	// 	}
	// }) 

	// $.when(getData)
	// 	.then((data) => {
	// 		console.log(data.data);
	// 		let responseData = data.data;
	// 		let giphyData = [];
	// 		responseData.map((item, i) => {
	// 		giphyData.push(item);			
	// 	})
	// 		this.setState({
	// 			searchResults: giphyData,
	// 			// dataIsLoading: false	
	// 		});
	// 	});
	}

	findRandomGif() {
	fetch(`http://api.giphy.com/v1/gifs/random?api_key=5ec81cbaf1b242b4a9297cbfa8db8cf1`).then(data => data.json())
	.then(response => {
		this.setState({
			randomGif: response.data,
			});
		});
	}

	collectFavorites(favoritedGifs) {
		this.setState({
			favoriteGifs: favoritedGifs
		});
	}

	collectFeatureGif(featureGif) {
		this.setState({
			featureGif: featureGif
		});
	}



	render() {
		return (
			<div>
				<Header />
				<main className="mainContent">
					<div className="wrapper mainWrapper">
						<section className="gifSearch">
							<Search startSearch={this.searchGifs} searchRandom={this.findRandomGif}/>
							<ResultList searchResults={this.state.searchResults} randomGif={this.state.randomGif} collectFavorites={this.collectFavorites} collectFeatureGif={this.collectFeatureGif}/>
						</section>
						<aside>
							<section className="selectedGif">

							</section>
							<section className="favoritedGifs">

							</section>
						</aside>				
					</div>
				</main>
			</div>

			)
		}
	}

ReactDOM.render(<App />, document.getElementById('app'));

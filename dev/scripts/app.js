import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header.js';
import Search from './components/Search.js';
import ResultList from './components/ResultList.js';
import FeaturedGif from './components/FeaturedGif.js';
import FavoritedGifs from './components/FavoritedGifs.js';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.searchGifs = this.searchGifs.bind(this);
		this.findRandomGif = this.findRandomGif.bind(this);
		this.collectFavorites = this.collectFavorites.bind(this);
		this.collectFeatureGif = this.collectFeatureGif.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
		this.handleExcludedGifs = this.handleExcludedGifs.bind(this);
		this.state = {
			searchQuery: '',
			searchResults: [],
			randomGif: '',
			favoriteGifs: [],
			featuredGif: {},
			excludedGifs: []
		};
	}

	searchGifs(searchQuery) {
	fetch(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&limit=30&api_key=5ec81cbaf1b242b4a9297cbfa8db8cf1`).then(data => data.json())
	.then(response => {
		this.setState({
			searchResults: response.data,
			dataIsLoading: false
			});
		});
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

	removeFavorite(updatedFavoriteList){
		console.log(updatedFavoriteList);
		let newFavoriteList = updatedFavoriteList;
		this.setState({
			favoriteGifs: updatedFavoriteList
		});
	}

	collectFeatureGif(featureGif) {
		this.setState({
			featuredGif: featureGif
		});
	}

	handleExcludedGifs(excludedGifs) {
		this.setState({
			excludedGifs: excludedGifs
		});
	}

	render() {
		console.log(this.state.searchResults);
		return (
			<div>
				<Header />
				<main className="mainContent">
					<div className="wrapper mainWrapper">
						<section className="gifSearch">
							<Search startSearch={this.searchGifs} searchRandom={this.findRandomGif}/>
							<ResultList searchResults={this.state.searchResults} randomGif={this.state.randomGif} favoritedGifs={this.state.favoriteGifs} excludedGifs={this.state.excludedGifs} collectFavorites={this.collectFavorites} collectFeatureGif={this.collectFeatureGif} handleExcludedGifs={this.handleExcludedGifs}/>
						</section>
						<aside>
							<section className="featuredGifContainer">
								<FeaturedGif featuredGif={this.state.featuredGif} favoritedGifs={this.state.favoriteGifs} collectFavorites={this.collectFavorites}/>
							</section>
							<section className="favoritedGifs">
								<FavoritedGifs favoritedGifs={this.state.favoriteGifs} removeFavorite={this.removeFavorite}/>
							</section>
						</aside>				
					</div>
				</main>
			</div>
			)
		}
	}

ReactDOM.render(<App />, document.getElementById('app'));

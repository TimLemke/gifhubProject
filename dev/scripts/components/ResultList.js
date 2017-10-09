import React from 'react';
import ReactDOM from 'react-dom';

import Gif from './Gif';


class ResultList extends React.Component {
	constructor(props) {
		super(props);
		this.removeGif = this.removeGif.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFocusClick = this.handleFocusClick.bind(this);
		this.handleFavorite = this.handleFavorite.bind(this);
		this.state = {
			searchResults: [],
			favoriteGifs: [],
			cuedFavorite: [],
			fullScreenGif: {},
			excludedGifs: []
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			searchResults: props.searchResults,
			favoriteGifs: props.favoritedGifs,
			excludedGifs: props.excludedGifs
		});
	}


	removeGif(index, gifID) {
		console.log(gifID);
		let gifList = Array.from(this.state.searchResults);
		gifList.splice(index, 1);
		let excludedGifs = Array.from(this.state.excludedGifs);
		excludedGifs.push(gifID);
		this.props.handleExcludedGifs(excludedGifs);
		// this.props.handleExcludedGifs(excludedGifs);
		this.setState({
		  searchResults: gifList,
		  excludedGifs: excludedGifs
		});
	}


	handleFocusClick(event) {
		event.preventDefault();
		let fullScreenGif = this.state.fullScreenGif;
		fullScreenGif.id = event.target.getAttribute('data-gifId');
		fullScreenGif.src = event.target.getAttribute('data-gifUrl');
		fullScreenGif.embed = event.target.getAttribute('data-embedUrl');
		fullScreenGif.source = event.target.getAttribute('data-Source');
		this.setState({
			fullScreenGif: fullScreenGif
		});
		this.props.collectFeatureGif(this.state.fullScreenGif);
	}

	handleClick(event) {
		event.preventDefault();
		let favoriteGif = {};
		favoriteGif.starRating = event.target.value;
		favoriteGif.src = event.target.getAttribute('data-gifUrl');
		favoriteGif.id = event.target.id;
		this.setState({
			cuedFavorite: favoriteGif
		});
	}

	handleFavorite(event) {
		event.preventDefault();
		let currentFavorites = Array.from(this.state.favoriteGifs);
		currentFavorites.push(this.state.cuedFavorite);
		let unratedArray = Array.from(this.state.favoriteGifs);
		let unratedFav = {};
		unratedFav.src = event.target.getAttribute('data-imgSrc');
		unratedFav.id = event.target.getAttribute('data-gifId');
		unratedFav.starRating = 0;
		unratedArray.push(unratedFav);

		if (event.target.getAttribute('data-gifId') === this.state.cuedFavorite.id ) {
			this.setState({
				favoriteGifs: currentFavorites,
				cuedFavorite: []
			});
			this.props.collectFavorites(currentFavorites);
		} else {
			this.setState({
				favoriteGifs: unratedArray,
				cuedFavorite: []
			});
			this.props.collectFavorites(unratedArray);
		}
	}

	render() {
		let preTrimmedGifs = Array.from(this.state.searchResults);
		let excludedGifs = Array.from(this.state.excludedGifs);
		let trimmedGifs = preTrimmedGifs.filter(function(gif) {
			return !excludedGifs.includes(gif.id)
		});
		let gifs = trimmedGifs.slice(0, 23);
		console.log(gifs);

		// var ages = [12, 19, 30, 45];
		// var siblings = [{name: 'erika', age: 30}, {name: 'christina', age: 28}, {name: 'angie', age: 20}];

		// siblings.filter(function (sibling) {
		//   return !ages.includes(sibling.age)
		  
		// });

		// console.log(siblings);


		return (
			<div className="gifResultContainer">
				{gifs.map((gif, index)=> {
					return(
						<div className="gifResult" data-starValue="0" key={gif.id}>
							<img src={gif.images.fixed_height.url} alt=""/>
							<div className="gifResult--Overlay">
								<div className="gifResult--buttons">
									<button>
										<i onClick={this.handleFavorite} data-gifId={gif.id} data-imgSrc={gif.images.fixed_height.url} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
									</button>
									<button>
										<i onClick={() => this.removeGif(index, gif.id)} data-removegifId={gif.id} className="fa fa-thumbs-o-down" aria-hidden="true"></i>
									</button>
								</div>
								<div className="gifResult--rating">
									<div className="rating">
										<button id={`${gif.id}`} onClick={this.handleClick} value={5} data-gifUrl={gif.images.fixed_height.url}>☆
										</button>
										<button id={`${gif.id}`} onClick={this.handleClick} value={4} data-gifUrl={gif.images.fixed_height.url}>☆
										</button>
										<button id={`${gif.id}`} onClick={this.handleClick} value={3} data-gifUrl={gif.images.fixed_height.url}>☆
										</button>
										<button id={`${gif.id}`} onClick={this.handleClick} value={2} data-gifUrl={gif.images.fixed_height.url}>☆
										</button>
										<button id={`${gif.id}`} onClick={this.handleClick} value={1} data-gifUrl={gif.images.fixed_height.url}>☆
										</button>
									</div>
									<button onClick={this.handleFocusClick} className="fullScreen" type="submit">
										<i data-gifId={gif.id} data-gifUrl={gif.images.fixed_height.url} data-embedUrl={gif.embed_url} data-Source={gif.source_tld} className="fa fa-arrows-alt" aria-hidden="true"></i>
									</button>
								</div>
							</div>
						</div>
				)})}
			</div>
			)
		}
	}


export default ResultList;
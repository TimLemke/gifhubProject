import React from 'react';
import ReactDOM from 'react-dom';

import Gif from './Gif';

// const ResultList = (props) => {
// 	const gifs = props.searchResults.map((searchResults) => {
// 		return(<Gif key={searchResults.id} src={searchResults.images.fixed_height.url}/>);
// 	});
// 	return (
// 		<div className="gifResultContainer">
// 			{gifs}
// 		</div>

// 	)
// }

class ResultList extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleFocusClick = this.handleFocusClick.bind(this);
		this.handleFavorite = this.handleFavorite.bind(this);
		this.state = {
			searchQuery: '',
			elements: [],
			favoriteGifs: [],
			cuedFavorite: [],
			fullScreenGif: {}
		};
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
		} else {
			this.setState({
				favoriteGifs: unratedArray,
				cuedFavorite: []
			});
		}
		this.props.collectFavorites(this.state.favoriteGifs);
	}

	render() {
		const gifs = this.props.searchResults;
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
										<i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
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
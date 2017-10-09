import React from 'react';
import ReactDOM from 'react-dom';

// const FeaturedGif = (props) => {
// 	return (
// 		<div className="featuredGif">
// 			<img src={props.featuredGif.src} alt=""/>
// 			<div className="featuredGif--info">
// 				<p>{props.featuredGif.embed}</p>
// 				<p>{props.featuredGif.source}</p>
// 			</div>
// 		</div>


// 	)
// }


class FeaturedGif extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleFavorite = this.handleFavorite.bind(this);
		// this.handleFocusClick = this.handleFocusClick.bind(this);
		this.state = {
			favoriteGifs: [],
			cuedFavorite: []
			// fullScreenGif: {}
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			favoriteGifs: props.favoritedGifs
		});
	}

	// handleFocusClick(event) {
	// 	event.preventDefault();
	// 	let fullScreenGif = this.state.fullScreenGif;
	// 	fullScreenGif.id = event.target.getAttribute('data-gifId');
	// 	fullScreenGif.src = event.target.getAttribute('data-gifUrl');
	// 	fullScreenGif.embed = event.target.getAttribute('data-embedUrl');
	// 	fullScreenGif.source = event.target.getAttribute('data-Source');
	// 	this.setState({
	// 		fullScreenGif: fullScreenGif
	// 	});
	// 	this.props.collectFeatureGif(this.state.fullScreenGif);
	// }

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
		// event.preventDefault();
		// let favoriteGifsList = Array.from(this.state.favoriteGifs);
		// favoriteGifsList.push(this.state.cuedFavorite);
		// this.props.collectFavorites(favoriteGifsList);

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
		return (
			<div className="featuredGif">
				<img src={this.props.featuredGif.src} alt=""/>
				<div className="featuredGif--info">
					<p>{this.props.featuredGif.embed}</p>
					<p>{this.props.featuredGif.source}</p>
					<div className="rating">
						<button id={`${this.props.featuredGif.id}`} onClick={this.handleClick} value={5} data-gifUrl={this.props.featuredGif.src}>☆
						</button>
						<button id={`${this.props.featuredGif.id}`} onClick={this.handleClick} value={4} data-gifUrl={this.props.featuredGif.src}>☆
						</button>
						<button id={`${this.props.featuredGif.id}`} onClick={this.handleClick} value={3} data-gifUrl={this.props.featuredGif.src}>☆
						</button>
						<button id={`${this.props.featuredGif.id}`} onClick={this.handleClick} value={2} data-gifUrl={this.props.featuredGif.src}>☆
						</button>
						<button id={`${this.props.featuredGif.id}`} onClick={this.handleClick} value={1} data-gifUrl={this.props.featuredGif.src}>☆
						</button>
					</div>
						<button>
							<i onClick={this.handleFavorite} data-gifId={this.props.featuredGif.id} data-imgSrc={this.props.featuredGif.src} className="fa fa-thumbs-o-up" aria-hidden="true"></i>
						</button>
				</div>
			</div>
			)
		}
	}



export default FeaturedGif;
import React from 'react';
import ReactDOM from 'react-dom';




class FavoritedGifs extends React.Component {
	constructor(props) {
		super(props);
		// this.handleClick = this.handleClick.bind(this);
		// this.handleFocusClick = this.handleFocusClick.bind(this);
		// this.handleFavorite = this.handleFavorite.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
		this.state = {
			favoritedGifs: []
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			favoritedGifs: props.favoritedGifs
		});
	}


	// componentDidMount() {
	// 	const favoriteGifsToShow = Array.from(this.props.favoritedGifs);
	// 	this.setState({
	// 		favoritedGifsList: favoriteGifsToShow
	// 	});

	// }


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

	// handleClick(event) {
	// 	event.preventDefault();
	// 	let favoriteGif = {};
	// 	favoriteGif.starRating = event.target.value;
	// 	favoriteGif.src = event.target.getAttribute('data-gifUrl');
	// 	favoriteGif.id = event.target.id;
	// 	this.setState({
	// 		cuedFavorite: favoriteGif
	// 	});
	// }

	// handleFavorite(event) {
	// 	event.preventDefault();
	// 	let currentFavorites = Array.from(this.state.favoriteGifs);
	// 	currentFavorites.push(this.state.cuedFavorite);
	// 	let unratedArray = Array.from(this.state.favoriteGifs);
	// 	let unratedFav = {};
	// 	unratedFav.src = event.target.getAttribute('data-imgSrc');
	// 	unratedFav.id = event.target.getAttribute('data-gifId');
	// 	unratedFav.starRating = 0;
	// 	unratedArray.push(unratedFav);

	// 	if (event.target.getAttribute('data-gifId') === this.state.cuedFavorite.id ) {
	// 		this.setState({
	// 			favoriteGifs: currentFavorites,
	// 			cuedFavorite: []
	// 		});
	// 	} else {
	// 		this.setState({
	// 			favoriteGifs: unratedArray,
	// 			cuedFavorite: []
	// 		});
	// 	}
	// 	this.props.collectFavorites(this.state.favoriteGifs);

	// }

	

	removeFavorite(index) {
		const favList = Array.from(this.state.favoritedGifs);
		favList.splice(index, 1);
		this.setState({
		  favoritedGifs: favList
		});
		this.props.removeFavorite(favList);
	}

	// removeItem(index) {
	// 	const items = Array.from(this.state.items);
	// 	items.splice(index, 1);
	// 	this.setState({
	// 		items: items,
	// 	})
	// }



	render() {

		let favoriteGifsToShow = Array.from(this.state.favoritedGifs);
		console.log(favoriteGifsToShow);
		favoriteGifsToShow.sort(function(a, b) {
			return(b.starRating - a.starRating);
		});
		return (
			<div className="favoritedGifs">
				<h1>Hi!</h1>
				{favoriteGifsToShow.map((favGif, index) => {
					return(
						<div key={index} className="favoritedGifs--item">
							<img src={favGif.src} alt=""/>
							<p>{favGif.starRating}</p>
							<button onClick={() => this.removeFavorite(index)}>Remove!</button>
						</div>
					)
					
				})}
				
			</div>
			)
		}
	}



export default FavoritedGifs;
import React from 'react';
import ReactDOM from 'react-dom';

class FavoritedGifs extends React.Component {
	constructor(props) {
		super(props);
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

	removeFavorite(index) {
		const favList = Array.from(this.state.favoritedGifs);
		favList.splice(index, 1);
		this.setState({
		  favoritedGifs: favList
		});
		this.props.removeFavorite(favList);
	}

	render() {
		let favoriteGifsToShow = Array.from(this.state.favoritedGifs);
		favoriteGifsToShow.sort(function(a, b) {
			return(b.starRating - a.starRating);
		});
		return (
			<div className="favoritedGifs">
				{favoriteGifsToShow.map((favGif, index) => {
					return(
						<div key={index} className="favGifResult">
							<img src={favGif.src} alt=""/>
							<div className="favGifResult--Overlay">
								<p>{favGif.starRating} <i className="fa fa-star" aria-hidden="true"></i></p>
								<button onClick={() => this.removeFavorite(index)}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
							</div>
							
						</div>
					)
					
				})}
				
			</div>
			)
		}
	}

export default FavoritedGifs;
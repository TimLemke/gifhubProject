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
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFocusClick = this.handleFocusClick.bind(this);
		this.state = {
			searchQuery: '',
			elements: [],
			favoriteGifs: [],
			cuedFavorite: []
			// gifIsLoading: true
			};
	}

	handleSubmit(event) {
		event.preventDefault();
		// console.log(event.target.input);
		let starButtonValue = '';
		if (document.getElementById('starValueOne').checked) {
			starButtonValue = document.getElementById('starValueOne').value;
		} else if (document.getElementById('starValueTwo').checked) {
			starButtonValue = document.getElementById('starValueTwo').value;
		} else {
			starButtonValue = document.getElementById('starValueThree').value;
		}
		// console.log(starButtonValue);

	}

	handleFocusClick(event) {
		event.preventDefault();
		// console.log(event.target.getAttribute('value'));
		let gifId = event.target.getAttribute('value');
		let gifSrc = event.target.getAttribute('data-gifUrl');
		// console.log(gifSrc);
		let favGif = {}
		favGif.starRating = 3;
		favGif.src = gifSrc;
		favGif.id = gifId;
		// console.log(gifId);
		let favoriteGifs = [];
		console.log(favGif);
		if (this.state.cuedFavorite.id === gifId) {
			favoriteGifs.push(this.state.cuedFavorite);
		} else {
			favoriteGifs.push(favGif);
		}
		console.log(favoriteGifs);
		
		// let starButtonValue = starButton.value;
		// console.log(this.state.starValue);
	}

	handleClick(event) {
		event.preventDefault();
		// console.log(event.target.value);
		// console.log(event.target.getAttribute('data-gifUrl'));
		let favoriteGif = {};
		favoriteGif.starRating = event.target.value;
		favoriteGif.src = event.target.getAttribute('data-gifUrl');
		favoriteGif.id = event.target.id;
		// console.log(favoriteGif);
		this.setState({
			cuedFavorite: favoriteGif
		});
	}


	// <form onSubmit={this.handleSubmit} className="gifResult--rating">
	// 								<label htmlFor="one">
	// 									<i className="fa fa-star" aria-hidden="true"></i>
	// 								</label>
	// 								<input onClick={this.handleClick} type="radio" name="ratingValue" value={1} id="starValueOne"/>
	// 								<label htmlFor="two">
	// 									<i className="fa fa-star" aria-hidden="true"></i>
	// 									<i className="fa fa-star" aria-hidden="true"></i>
	// 								</label>
	// 								<input onClick={this.handleClick} type="radio" name="ratingValue" value={2} id="starValueTwo"/>
	// 								<label htmlFor="three">
	// 									<i className="fa fa-star" aria-hidden="true"></i>
	// 									<i className="fa fa-star" aria-hidden="true"></i>
	// 									<i className="fa fa-star" aria-hidden="true"></i>
	// 								</label>
	// 								<input onClick={this.handleClick} type="radio" name="ratingValue" value={3} id="starValueThree"/>
	// 								<button type="submit">
	// 									<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
	// 								</button>
	// 							</form>

	render() {
		const gifs = this.props.searchResults;
		// console.log(gifs);
		return (
			<div className="gifResultContainer">
				{gifs.map((gif, index)=> {
					return(
						<div className="gifResult" data-starValue="0" key={gif.id}>
							<img src={gif.images.fixed_height.url} alt=""/>
							<div className="gifResult--Overlay">
								<div className="gifResult--buttons">
									<button>
										<i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
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
										<i value={gif.id} data-gifUrl={gif.images.fixed_height.url} className="fa fa-arrows-alt" aria-hidden="true"></i>
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
import React from 'react';
import ReactDOM from 'react-dom';

import firebase, { auth, provider } from './components/Firebase.js';
import Header from './components/Header.js';
import Search from './components/Search.js';
import ResultList from './components/ResultList.js';
import FeaturedGif from './components/FeaturedGif.js';
import FavoritedGifs from './components/FavoritedGifs.js';
import Footer from './components/Footer.js';

const dbRef = firebase.database().ref('/App');


class App extends React.Component {
	constructor(props) {
		super(props);
		this.searchGifs = this.searchGifs.bind(this);
		this.collectFavorites = this.collectFavorites.bind(this);
		this.collectFeatureGif = this.collectFeatureGif.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
		this.handleExcludedGifs = this.handleExcludedGifs.bind(this);
		this.login = this.login.bind(this); 
		this.logout = this.logout.bind(this);
		this.state = {
			searchQuery: '',
			searchResults: [],
			randomGif: '',
			favoriteGifs: [],
			featuredGif: {},
			excludedGifs: [],
			user: null,
			userDisplayName: '',
			userPhotoUrl: '',
			userId: ''
		};
	}

	login() {
		auth.signInWithPopup(provider) 
			.then((result) => {
			const user = result.user;
			this.setState({
				user: user,
				userDisplayName: user.displayName,
				userPhotoUrl: user.photoURL,
				userId: user.uid
			})
			const userDBRef = dbRef.child(`users/${this.state.userId}/favoriteGifs`);
			userDBRef.on('value', (snapshot) => {
				const items = snapshot.val();
				if (items === null) {
					this.setState({
						favoriteGifs: []
					})	
				} 
				else {
					this.setState({
						favoriteGifs: items
					});
				}
				
			});
			const userDBRefExcludedGifs = dbRef.child(`users/${this.state.userId}/ExcludedGifs`);
			userDBRefExcludedGifs.on('value', (snapshot) => {
				const items = snapshot.val();
				const savedFavoriteGifs = [];
				if (items === null) {
					this.setState({
						excludedGifs: []
					})	
				} 
				else {
					this.setState({
						excludedGifs: items
					});
				}
			});

		});
	}

	logout() {
		auth.signOut()
			.then(() => {
			this.setState({
			user: null,
			userDisplayName: '',
			userPhotoUrl: '',
			userId: '',
			favoriteGifs: [],
			excludedGifs: [],
			featuredGif: {},
			searchResults: []
			});
		});
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({
				user: user,
				userDisplayName: user.displayName,
				userPhotoUrl: user.photoURL,
				userId: user.uid,
			})
				const userDBRef = dbRef.child(`users/${this.state.userId}/favoriteGifs`);
				userDBRef.on('value', (snapshot) => {
					const items = snapshot.val();
					const savedFavoriteGifs = [];
					if (items === null) {
						this.setState({
							favoriteGifs: []
						})	
					} 
					else {
						this.setState({
							favoriteGifs: items
						});
					}
					const userDBRefExcludedGifs = dbRef.child(`users/${this.state.userId}/ExcludedGifs`);
					userDBRefExcludedGifs.on('value', (snapshot) => {
						const items = snapshot.val();
						const savedFavoriteGifs = [];
						if (items === null) {
							this.setState({
								excludedGifs: []
							})	
						} 
						else {
							this.setState({
								excludedGifs: items
							});
						}
					});
				});
			}; 
		});
	}

	searchGifs(searchQuery) {
	fetch(`https://api.giphy.com/v1/gifs/search?q=${searchQuery}&limit=50&api_key=5ec81cbaf1b242b4a9297cbfa8db8cf1`).then(data => data.json())
	.then(response => {
		this.setState({
			searchResults: response.data,
			dataIsLoading: false
			});
		});
	}

	collectFavorites(favoritedGifs) {
		this.setState({
			favoriteGifs: favoritedGifs
		});
		const userDBRef = dbRef.child(`users/${this.state.userId}/favoriteGifs`)
		userDBRef.set(favoritedGifs);
	}

	removeFavorite(updatedFavoriteList){
		let newFavoriteList = updatedFavoriteList;
		this.setState({
			favoriteGifs: updatedFavoriteList
		});
		const userDBRef = dbRef.child(`users/${this.state.userId}/favoriteGifs`)
		userDBRef.set(updatedFavoriteList);
	

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
		const userDBRefExcludedGifs = dbRef.child(`users/${this.state.userId}/ExcludedGifs`);
		userDBRefExcludedGifs.set(excludedGifs);
	}

	render() {
		return (
			<div>
			{this.state.user ? 
				<div>
					<Header userPhoto={this.state.userPhotoUrl} logout={this.logout} />
					<main className="mainContent">
						<div className="wrapper mainWrapper">
							<section className="gifSearch">
								<h2>Search for a Gif!</h2>
								<Search startSearch={this.searchGifs} searchRandom={this.findRandomGif}/>
								<ResultList searchResults={this.state.searchResults} randomGif={this.state.randomGif} favoritedGifs={this.state.favoriteGifs} excludedGifs={this.state.excludedGifs} collectFavorites={this.collectFavorites} collectFeatureGif={this.collectFeatureGif} handleExcludedGifs={this.handleExcludedGifs}/>
							</section>
							<aside>
								<section className="featuredGifContainer">
									<FeaturedGif featuredGif={this.state.featuredGif} />
								</section>
								<section className="favoritedGifsContainer">
									<h2>Your Favorited Gifs!</h2>
									<FavoritedGifs favoritedGifs={this.state.favoriteGifs} removeFavorite={this.removeFavorite} />
								</section>
							</aside>				
						</div>
					</main>
					<Footer />
				</div>
				: 
				<div className="app">
					<main className="logInMain">
						<div className="wrapper logInWrapper">
							<div className="logInContentsContainer">
								<h1>GifHub</h1>
								<img className="logInGif" src="https://media0.giphy.com/media/w9wKbQhhGpfs4/200.gif" alt="Guy deleting his computer Gif!"/>
								<button className="logInButton" onClick={this.login}>Log In!</button>
							</div>
						</div>
					</main>
				</div>
			}
			</div>
			)
		}
	}

ReactDOM.render(<App />, document.getElementById('app'));

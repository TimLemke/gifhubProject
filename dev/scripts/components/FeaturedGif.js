import React from 'react';
import ReactDOM from 'react-dom';

class FeaturedGif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			featureGif: {} 
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			featureGif: props.featuredGif
		});
	}

	render() {
		return (
			<div className="featuredGif">
				<img src={this.props.featuredGif.src} alt=""/>
				<div className="featuredGif--info">
					<div>
						<a href={this.props.featuredGif.embed} target="_blank"> {this.props.featuredGif.embedText}</a>
						<a href={this.props.featuredGif.source} target="_blank"> {this.props.featuredGif.sourceText}</a>
				
					</div>
				</div>

			</div>
			)
		}
	}

export default FeaturedGif;
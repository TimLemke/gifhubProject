import React from 'react';
import ReactDOM from 'react-dom';

// // <div className="rating">
// 					<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
// // 				</div>

// const Gif = (props) => {
// 	return (
// 		<div className="gifResult">
// 			<img src={props.src} alt=""/>
// 			<div className="gifResult--Overlay">
// 				<a href="">
// 					<i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
// 				<a href="">
// 					<i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a>
				
// 				<div className="rating">
// 				<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
// 				</div>
// 			</div>
// 		</div>

// 	);
// };

class Gif extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFocusClick = this.handleFocusClick.bind(this);
		this.state = {
			searchQuery: '',
			elements: [],
			// gifIsLoading: true
			};
	}

	// <div onClick={this.handleFocusClick} className="gifResult--Overlay">
	// 			<a href="">
	// 				</a>
	// 			<a href="">
	// 				</a>
				
				
	// 		</div>


	// componentDidMount() {
	// 	this.setState({
	// 		gifIsLoading: false
	// 	})
	// }

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.props.src);
	}

	handleFocusClick(event) {
		event.preventDefault();
		console.log(this.props.src);
	}

	handleClick(event) {
		event.preventDefault();
		console.log(event.target.value);
	}



	render() {
		return (
			<div className="gifResult">
				<img  src={this.props.src} alt=""/>
					<form onSubmit={this.handleSubmit} className="gifResult--Overlay">
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
								<button onClick={this.handleClick}value={5}>☆
								</button>
								<button onClick={this.handleClick}value={4}>☆
								</button>
								<button onClick={this.handleClick}value={3}>☆
								</button>
								<button onClick={this.handleClick}value={2}>☆
								</button>
								<button onClick={this.handleClick}value={1}>☆
								</button>
							</div>
							<button onClick={this.handleFocusClick} className="fullScreen" type="submit">
								<i className="fa fa-arrows-alt" aria-hidden="true"></i>
							</button>
						</div>
					</form>
				</div>
			)
		}
	}

export default Gif;
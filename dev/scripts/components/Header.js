import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
	return (
		<header className="pageHeader">
			<div className="wrapper headerWrapper">
				<div className="pageHeader--left">
					<h2>Welcome to GifHub!</h2>
					<p>Search for the Gif of your choice, give it a star rating <span>☆</span> and add it to your favorites! <i className="fa fa-heart" aria-hidden="true"></i></p>
					<p>Click on the expand link <i className="fa fa-plus-square" aria-hidden="true"></i> to see the Gif larger, get more info about it and get the embed link!</p>
					<p>Don't like a Gif? Never want to see it again? Click on the trash button <i className="fa fa-trash" aria-hidden="true"></i> and you will never see it again!</p>
				</div>
				<div className="pageHeader--right">
					<img className="userImage" src={`${props.userPhoto}`} alt=""/>
					<button onClick={props.logout}>Log Out</button>
				</div>
			</div>
			
		</header>
	);
}

export default Header;


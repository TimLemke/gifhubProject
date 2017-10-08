import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
	return (
		<header className="pageHeader">
			<div className="wrapper headerWrapper">
				<div className="pageHeader--left">
					<h1>Hello!</h1>
				</div>
				<div className="pageHeader--right">
					<h1>Good Day!</h1>
				</div>
			</div>
			
		</header>
	);
}

export default Header;


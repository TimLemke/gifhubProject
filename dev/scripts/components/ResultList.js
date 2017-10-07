import React from 'react';
import ReactDOM from 'react-dom';

import Gif from './Gif';



const ResultList = (props) => {
	const gifs = props.searchResults.map((searchResults) => {
		return(<Gif key={searchResults.id} src={searchResults.images.fixed_height.url}/>);
	});
	return (
		<div className="gifResultContainer">
			{gifs}
		</div>

	)
}

export default ResultList;
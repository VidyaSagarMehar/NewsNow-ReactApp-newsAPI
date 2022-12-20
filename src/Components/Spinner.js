import React, { Component } from 'react';
import loading from '../Spinner.gif';

export default class Spinner extends Component {
	render() {
		return (
			<div>
				<img src={loading} alt="loading" />
			</div>
		);
	}
}

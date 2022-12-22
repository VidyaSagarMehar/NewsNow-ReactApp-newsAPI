import React, { Component } from 'react';
import loading from '../Spinner.gif';

export default function Spinner() {
	return (
		<div>
			<img src={loading} alt="loading" />
		</div>
	);
}

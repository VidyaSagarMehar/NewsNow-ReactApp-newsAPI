import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
	constructor() {
		super();
		console.log("Hello I'm from news section");
		this.state = {
			articles: [],
			loading: false,
			page: 1,
		};
	}

	async componentDidMount() {
		let url =
			'https://newsapi.org/v2/top-headlines?country=in&apiKey=ec8273a5be3e458ebf626e6891e945c0&page=1&pagesize=20';
		let data = await fetch(url);
		let parseData = await data.json();
		console.log(parseData);
		this.setState({
			articles: parseData.articles,
			totalResults: parseData.totalResults,
		});
	}

	handlePrevClick = async () => {
		let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ec8273a5be3e458ebf626e6891e945c0&page=${
			this.state.page - 1
		}&pagesize=20`;
		let data = await fetch(url);
		let parseData = await data.json();
		console.log(parseData);

		this.setState({
			page: this.state.page - 1,
			articles: parseData.articles,
		});
	};
	handleNextClick = async () => {
		if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
			//we'll do nothing here
		} else {
			let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ec8273a5be3e458ebf626e6891e945c0&page=${
				this.state.page + 1
			}&pagesize=20`;
			let data = await fetch(url);
			let parseData = await data.json();
			console.log(parseData);

			this.setState({
				page: this.state.page + 1,
				articles: parseData.articles,
			});
		}
	};

	render() {
		return (
			<div className="container my-4">
				<h2>Top Headlines</h2>
				<div className="row">
					{this.state.articles.map((element) => {
						return (
							<div className="col-md-4" key={element.url}>
								<NewsItem
									title={element.title ? element.title.slice(0, 50) : ''}
									description={
										element.description ? element.description.slice(0, 90) : ''
									}
									imageUrl={element.urlToImage}
									newsUrl={element.url}
								/>
							</div>
						);
					})}
				</div>
				<div
					className=" container btn-group d-flex justify-content-around"
					role="group"
					aria-label="Basic mixed styles example"
				>
					<button
						type="button"
						className="btn btn-danger"
						disabled={this.state.page <= 1}
						onClick={this.handlePrevClick}
					>
						&laquo; Previous
					</button>

					<button
						type="button"
						className="btn btn-success"
						onClick={this.handleNextClick}
					>
						Next &raquo;
					</button>
				</div>
			</div>
		);
	}
}

export default News;

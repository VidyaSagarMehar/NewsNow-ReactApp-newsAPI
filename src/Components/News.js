import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
	static defaultProps = {
		country: 'in',
		pageSize: 8,
		category: 'general',
	};
	static propTypes = {
		country: PropTypes.string,
		pageSize: PropTypes.number,
		category: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			loading: false,
			page: 1,
			totalResults: 0,
		};
		document.title = `${this.props.category} - News Now`;
	}

	async updateNews() {
		this.props.setProgress(0);
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
		this.setState({ loading: true });
		let data = await fetch(url);
		this.props.setProgress(30);
		let parseData = await data.json();
		this.props.setProgress(70);
		this.setState({
			articles: parseData.articles,
			totalResults: parseData.totalResults,
			loading: false,
		});
		this.props.setProgress(100);
	}

	async componentDidMount() {
		// let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec8273a5be3e458ebf626e6891e945c0&page=1&pagesize=${this.props.pageSize}`;
		// this.setState({ loading: true });
		// let data = await fetch(url);
		// let parseData = await data.json();
		// this.setState({
		// 	articles: parseData.articles,
		// 	totalResults: parseData.totalResults,
		// 	loading: false,
		// });
		this.updateNews();
	}

	handlePrevClick = async () => {
		this.setState({ page: this.state.page - 1 });
		this.updateNews();
	};
	handleNextClick = async () => {
		this.updateNews();
		this.setState({ page: this.state.page + 1 });
	};
	fetchMoreData = async () => {
		this.setState({ page: this.state.page + 1 });
		const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ec8273a5be3e458ebf626e6891e945c0&page=${this.state.page}&pagesize=${this.props.pageSize}`;
		// this.setState({ loading: true });
		let data = await fetch(url);
		let parseData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parseData.articles),
			totalResults: parseData.totalResults,
			loading: false,
		});
	};

	render() {
		return (
			<div className="container my-4">
				<h2>Top Headlines - {this.props.category}</h2>
				{this.state.loading && <Spinner />}
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={<Spinner />}
				>
					<div className="container">
						<div className="row">
							{this.state.articles.map((element) => {
								return (
									<div className="col-md-4" key={element.url}>
										<NewsItem
											title={element.title ? element.title.slice(0, 50) : ''}
											description={
												element.description
													? element.description.slice(0, 90)
													: ''
											}
											imageUrl={element.urlToImage}
											newsUrl={element.url}
											author={element.author}
											date={element.publishedAt}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</InfiniteScroll>
			</div>
		);
	}
}

export default News;

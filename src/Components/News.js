import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	const updateNews = async () => {
		props.setProgress(0);
		const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
		setLoading(true);
		let data = await fetch(url);
		props.setProgress(30);
		let parseData = await data.json();
		props.setProgress(70);
		setArticles(parseData.articles);
		setTotalResults(parseData.totalResults);
		setLoading(false);

		props.setProgress(100);
	};

	useEffect(() => {
		document.title = `${props.category} - News Now`;
		updateNews();
		// eslint-disable-next-line
	}, []);

	const fetchMoreData = async () => {
		const url = `https://newsapi.org/v2/top-headlines?country=${
			props.country
		}&category=${props.category}&apiKey=${props.apiKey}&page=${
			page + 1
		}&pagesize=${props.pageSize}`;
		setPage(page + 1);
		let data = await fetch(url);
		let parseData = await data.json();
		setArticles(articles.concat(parseData.articles));
		setTotalResults(parseData.totalResults);
	};

	return (
		<div className="container my-4">
			<h2 style={{ marginTop: '85px', marginBottom: '20px' }}>
				Top Headlines - {props.category}
			</h2>
			{loading && <Spinner />}
			<InfiniteScroll
				dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length !== totalResults}
				loader={<Spinner />}
			>
				<div className="container">
					<div className="row">
						{articles.map((element) => {
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
};
News.defaultProps = {
	country: 'in',
	pageSize: 8,
	category: 'general',
};
News.propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string,
};
export default News;

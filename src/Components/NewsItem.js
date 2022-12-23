import React from 'react';

const NewsItem = (props) => {
	let { title, description, imageUrl, newsUrl, author, date } = props;
	return (
		<div>
			<div className="card">
				<img
					src={
						!imageUrl
							? 'https://images.moneycontrol.com/static-mcnews/2022/10/nifty_market-Sensex-2-770x433.jpg'
							: imageUrl
					}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{description}</p>
					<p className="card-text">
						<small className="text-muted">
							By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}
						</small>
					</p>
					<a
						href={newsUrl}
						target="_blank"
						rel="noreferrer"
						className="btn btn-sm btn-primary"
					>
						Read more
					</a>
				</div>
			</div>
		</div>
	);
};

export default NewsItem;

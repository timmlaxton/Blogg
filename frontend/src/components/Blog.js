import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Blog = ({ blog }) => {
	return (
		<Card style={{ width: '20rem' }}>
			<Link to={`/blog/${blog._id}`}>
				<Card.Img className="card-image" src={blog.image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/blog/${blog._id}`}>
					<Card.Title className="card-heading">
						<strong>{blog.heading}</strong>
					</Card.Title>
				</Link>

				<Card.Text className="card-title">{blog.title}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Blog;

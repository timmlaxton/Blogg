import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import blogs from '../blogs';

const BlogScreen = ({ match }) => {
	const blog = blogs.find((p) => p._id === match.params.id);

	return (
		<>
			<Link Button className="btn btn-light" to="/">
				Go Back
			</Link>
			<Row>
				<Col>
					<Image className="blog-image" src={blog.image} alt={blog.title} fluid />
				</Col>
				<Col>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2 className="blog-heading">{blog.heading}</h2>
							<h4 className="blog-post">{blog.post}</h4>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	);
};

export default BlogScreen;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';

const BlogScreen = ({ match }) => {
	const [blog, setBlog] = useState({});

	useEffect(() => {
		const fetchBlog = async () => {
			const { data } = await axios.get(`/api/blogs/${match.params.id}`);

			setBlog(data);
		};

		fetchBlog();
	}, []);

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

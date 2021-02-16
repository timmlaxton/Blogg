import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { listBlogDetails } from '../actions/blogActions';

const BlogScreen = ({ match }) => {
	const dispatch = useDispatch();

	const blogDetails = useSelector((state) => state.blogDetails);
	const { loading, error, blog } = blogDetails;

	useEffect(() => {
		dispatch(listBlogDetails(match.params.id));
	}, [dispatch, match]);

	return (
		<>
			<Link Button className="btn btn-light" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
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
			)}
		</>
	);
};

export default BlogScreen;

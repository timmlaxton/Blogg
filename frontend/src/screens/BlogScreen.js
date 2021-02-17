import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
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
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Image src={blog.image} alt={blog.title} fluid />

					<Col>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>{blog.heading}</h2>
								<h4>{blog.post}</h4>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			)}
		</>
	);
};

export default BlogScreen;

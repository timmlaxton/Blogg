import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { listBlogDetails, createBlogReview } from '../actions/blogActions';
import { BLOG_CREATE_REVIEW_RESET } from '../constants/blogConstants';

const BlogScreen = ({ match }) => {
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const blogDetails = useSelector((state) => state.blogDetails);
	const { loading, error, blog } = blogDetails;

	const blogCommentCreate = useSelector((state) => state.blogCommentCreate);
	const { error: errorBlogReview, success: successBlogReview } = blogCommentCreate;

	useEffect(() => {
		if (successBlogReview) {
			setComment('');
			dispatch({ type: BLOG_CREATE_REVIEW_RESET });
		}
		dispatch(listBlogDetails(match.params.id));
	}, [dispatch, match, successBlogReview]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			createBlogReview(match.params.id, {
				comment
			})
		);
	};

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
				<>
					<Row>
						<Image src={blog.image} alt={blog.title} fluid />

						<Col>
							<ListGroup variant="flush">
								<ListGroup.Item key={blog._id}>
									<h2>{blog.heading}</h2>
									{blog.post}
									<br />
									<br />
									<p>{blog.createdAt}</p>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							{errorBlogReview && <Message variant="danger">{errorBlogReview}</Message>}
							<ListGroup variant="flush">
								{blog.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Add a comment</h2>
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="comment">
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Submit Comment
											</Button>
										</Form>
									) : (
										<Message>
											<Link to="/login"> Sign In</Link> to add a comment {'  '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default BlogScreen;

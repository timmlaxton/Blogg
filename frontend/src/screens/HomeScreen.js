import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Blog from '../components/Blog';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBlogs } from '../actions/blogActions';

const HomeScreen = () => {
	const dispatch = useDispatch();

	const blogList = useSelector((state) => state.blogList);
	const { loading, error, blogs } = blogList;

	useEffect(() => {
		dispatch(listBlogs());
	}, [dispatch]);

	return (
		<>
			<Container>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="primary">{error}</Message>
				) : (
					<Row className="cards">
						{blogs.map((blog) => (
							<Col className="cards" key={blog._id} sm={4} md={4} lg={3} xl={3}>
								<Blog blog={blog} />
							</Col>
						))}
					</Row>
				)}
			</Container>
		</>
	);
};

export default HomeScreen;

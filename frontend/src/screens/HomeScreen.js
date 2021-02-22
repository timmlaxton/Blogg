import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import Blog from '../components/Blog';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Image from 'react-bootstrap/Image';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { listBlogs } from '../actions/blogActions';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;
	const dispatch = useDispatch();

	const blogList = useSelector((state) => state.blogList);
	const { loading, error, blogs } = blogList;

	useEffect(() => {
		dispatch(listBlogs(keyword));
	}, [dispatch, keyword]);

	AOS.init();

	return (
		<>
			<Container>
				<Jumbotron className="jumbotron">
					<Image
						className="jumbo-image"
						src="https://images.unsplash.com/photo-1516279923025-3aded0e37705?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTF8fHR5cGV3cml0ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
						fluid
					/>
					<h1 className="main-header">Hello, and welcome to Blogger!</h1>
					<p className="main-paragraph">
						Hi, my name is Tim and I've created this blogging site as a portfolio piece to showcase my work using React.
					</p>
				</Jumbotron>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="primary">{error}</Message>
				) : (
					<Row className="cards">
						{blogs.map((blog) => (
							<Col data-aos="fade-up" className="cards" key={blog._id} sm={4} md={4} lg={4} xl={4}>
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

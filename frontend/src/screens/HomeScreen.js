import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Jumbotron, ListGroup } from 'react-bootstrap';
import Blog from '../components/Blog';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Image from 'react-bootstrap/Image';
import { listBlogs, listBlogDetails } from '../actions/blogActions';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeScreen = ({ match, blog }) => {
	const keyword = match.params.keyword;

	const dispatch = useDispatch();

	const blogList = useSelector((state) => state.blogList);
	const { loading, error, blogs } = blogList;

	const blogDetails = useSelector((state) => state.blogDetails);
	const { loading: loadingSuccess, error: errorSuccess, blog: blogSuccess } = blogDetails;

	const [blogsByCategory, setBlogsByCategory] = useState({});

	useEffect(() => {
		dispatch(listBlogs(keyword));
	}, [dispatch, keyword]);

	useEffect(() => {
		let blogsByCategory = getBlogsByCategory(blogs);
		setBlogsByCategory(blogsByCategory);
	}, [blogs]);

	useEffect(() => {
		if (blogSuccess) dispatch(listBlogDetails(match.params.id));
	}, [dispatch, match, blogSuccess]);

	function getBlogsByCategory(blogs = []) {
		return blogs.reduce((acc, blog) => {
			const { category } = blog;
			if (!Object.prototype.hasOwnProperty.call(acc, category)) {
				acc[category] = [];
			}

			blog.featured && acc[category].push(blog);
			return acc;
		}, {});
	}

	AOS.init();

	return (
		<>
			{!keyword && (
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
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="primary">{error}</Message>
			) : (
				<Row className="cards">
					{blogs.map((blog) => (
						<Col data-aos="fade-up" className="cards" key={blog._id} sm={2} md={2} lg={2} xl={2}>
							<Blog blog={blog} />
						</Col>
					))}
				</Row>
			)}

			<h1>Latest Blogs by Category</h1>
			{loadingSuccess ? (
				<Loader />
			) : errorSuccess ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					{blogsByCategory?.['Science']?.map((blog) => (
						<Col data-aos="flip-up" className="cards" key={blog._id} sm={2} md={2} lg={2} xl={2}>
							<Blog blog={blog} />
						</Col>
					))}

					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item></ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			)}
		</>
	);
};

export default HomeScreen;

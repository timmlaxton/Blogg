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
		dispatch(listBlogDetails(match.params.id));
	}, [dispatch, match]);

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
						Hi, my name is Tim and I've created this blogging site to keep my mind active whilst in lockdown.
					</p>
				</Jumbotron>
			)}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="primary">{error}</Message>
			) : (
				<Row className="cards-row">
					{blogs.map((blog) => (
						<Col data-aos="fade-up" className="cards" key={blog._id} sm={3} md={3} lg={3} xl={3}>
							<Blog blog={blog} />
						</Col>
					))}
				</Row>
			)}

			<h1>Recent Posts</h1>
			{loadingSuccess ? (
				<Loader />
			) : errorSuccess ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<h3 className="post-heading">Sport </h3>
					<br />
					{blogsByCategory?.['sport']?.map((blog) => (
						<Col data-aos="flip-up" className="category-card-sport" key={blog._id} sm={4} md={4} lg={4} xl={4}>
							<Blog blog={blog} />
						</Col>
					))}
					<Col md={3}>
						<p className="blog-description">
							Sport has a long history of discussing politics, but should players do all there talking on the pitch...
						</p>
					</Col>
				</Row>
			)}

			{loadingSuccess ? (
				<Loader />
			) : errorSuccess ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<h3 className="post-heading">Gaming </h3>
					<br />
					{blogsByCategory?.['Games']?.map((blog) => (
						<Col data-aos="flip-up" className="category-card-sport" key={blog._id} sm={4} md={4} lg={4} xl={4}>
							<Blog blog={blog} />
						</Col>
					))}
					<Col md={3}>
						<p className="blog-description">
							Once again, the debate over the impact of video games and children's development has resurfaced....
						</p>
					</Col>
				</Row>
			)}

			{loadingSuccess ? (
				<Loader />
			) : errorSuccess ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<h3 className="post-heading">Books </h3>
					<br />
					{blogsByCategory?.['Books']?.map((blog) => (
						<Col data-aos="flip-up" className="category-card-sport" key={blog._id} sm={4} md={4} lg={4} xl={4}>
							<Blog blog={blog} />
						</Col>
					))}
					<Col md={3}>
						<p className="blog-description">
							Last month, Dr Carl Hart published his latest book "Drug use for grown - ups" where he argues (again)...
						</p>
					</Col>
				</Row>
			)}

			{loadingSuccess ? (
				<Loader />
			) : errorSuccess ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<h3 className="post-heading">Science </h3>
					<br />
					{blogsByCategory?.['Science']?.map((blog) => (
						<Col data-aos="flip-up" className="category-card-sport" key={blog._id} sm={4} md={4} lg={4} xl={4}>
							<Blog blog={blog} />
						</Col>
					))}
					<Col md={3}>
						<p className="blog-description">
							Many have speculated for years, that with the advancement in AI and robot technology...
						</p>
					</Col>
				</Row>
			)}
		</>
	);
};

export default HomeScreen;

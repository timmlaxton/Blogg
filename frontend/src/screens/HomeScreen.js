import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Blog from '../components/Blog';

const HomeScreen = () => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const fetchBlogs = async () => {
			const { data } = await axios.get('/api/blogs');

			setBlogs(data);
		};

		fetchBlogs();
	}, []);

	return (
		<>
			<Container>
				<Row className="cards">
					{blogs.map((blog) => (
						<Col className="cards" key={blog._id} sm={2} md={2} lg={2} xl={2}>
							<Blog blog={blog} />
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default HomeScreen;

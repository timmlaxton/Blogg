import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Blog from '../components/Blog';
import blogs from '../blogs';

const HomeScreen = () => {
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

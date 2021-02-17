import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBlogs, deleteBlog } from '../actions/blogActions';

const BlogListScreen = ({ history, match }) => {
	const dispatch = useDispatch();

	const blogList = useSelector((state) => state.blogList);
	const { loading, error, blogs } = blogList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const blogDelete = useSelector((state) => state.blogDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = blogDelete;

	useEffect(() => {
		if (!userInfo && userInfo.isAdmin) {
			history.push('/login');
		} else {
			dispatch(listBlogs());
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteBlog(id));
		}
	};

	const createBlogHandler = () => {
		history.push(`/admin/podcast/create`);
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Blogs</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createBlogHandler}>
						Create blog
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loading && <Loader />}
			{error && <Message variant="danger">{error}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table bordered hover responsive className="table-sm">
					<tbody>
						{blogs.map((blog) => (
							<tr key={blog._id}>
								<td>
									<strong>{blog.heading}</strong>
								</td>

								<td>
									<LinkContainer to={`/admin/blog/${blog._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>

									<Button variant="primary" className="btn-sm" onClick={() => deleteHandler(blog._id)}>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default BlogListScreen;

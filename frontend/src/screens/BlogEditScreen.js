import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listBlogDetails, updateBlog, createBlog } from '../actions/blogActions';
import { BLOG_UPDATE_RESET, BLOG_CREATE_RESET } from '../constants/blogConstants';

const BlogEditScreen = ({ match, history }) => {
	const blogId = match.params.id;

	const [heading, setHeading] = useState('');
	const [title, setTitle] = useState('');
	const [post, setPost] = useState('');
	const [image, setImage] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [imagePreview, setImagePreview] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [category, setCategory] = useState(false);
	const [featured, setFeatured] = useState(false);

	const dispatch = useDispatch();

	const blogDetails = useSelector((state) => state.blogDetails);
	const { loading, error, blog } = blogDetails;

	const isCreateBlogMode = match.path.includes('/admin/blog/create');

	const blogUpdate = useSelector((state) => (isCreateBlogMode ? state.blogCreate : state.blogUpdate));
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = blogUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: isCreateBlogMode ? BLOG_CREATE_RESET : BLOG_UPDATE_RESET });
			history.push('/admin/bloglist');
			return;
		}

		if (isCreateBlogMode) return;
		if (!blog.heading || blog._id !== blogId) {
			dispatch(listBlogDetails(blogId));
		} else {
			setHeading(blog.heading);
			setTitle(blog.title);
			setPost(blog.post);
			setCategory(blog.category);
			setFeatured(blog.featured);
			setImagePreview(blog.image);
		}
	}, [dispatch, blogId, blog, history, successUpdate, isCreateBlogMode]);
	const onUploadImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				setImagePreview(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			setImagePreview(null);
		}
	};

	const uploadFileHandler = async () => {
		if (!image) return '';
		const file = image;
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};

			const { data } = await axios.post('/api/upload', formData, config);
			return data;
		} catch (error) {
			console.error(error);
			setUploading(false);
			throw new Error('There was a problem');
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		let finalImage = imageUrl;
		if (!finalImage && image) {
			finalImage = await uploadFileHandler();
		}

		const payload = {
			_id: blogId,
			heading,
			title,
			post,
			category,
			featured,
			...(finalImage && { image: finalImage })
		};

		dispatch(isCreateBlogMode ? createBlog(payload) : updateBlog(payload));
	};

	return (
		<>
			<Link to="/admin/bloglist" className="btn btn-light my-3">
				Go Back
			</Link>

			<FormContainer>
				<h1>{isCreateBlogMode ? 'Create Blog' : 'Edit Blog'}</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="heading">
							<Form.Label>Heading</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter heading"
								value={heading}
								onChange={(e) => setHeading(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Select Category</Form.Label>
							<Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
								<option value="Sport">Sport</option>
								<option value="Science">Science</option>
								<option value="Money">Money</option>
								<option value="Music">Music</option>
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							></Form.Control>

							<Form.File id="image-file" label="Choose File" custom onChange={onUploadImage}></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						{imagePreview ? <Image src={imagePreview} fluid /> : null}

						<Form.Group controlId="featured">
							<Form.Label>Featured</Form.Label>
							<Form.Check
								checked={featured}
								type="checkbox"
								onChange={(e) => setFeatured(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Form.Group controlId="post">
							<Form.Label>Post</Form.Label>
							<Form.Control
								as="textarea"
								rows={10}
								cols={10}
								wrap="hard"
								placeholder="Write ya post"
								value={post}
								onChange={(e) => setPost(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							{isCreateBlogMode ? 'Create' : 'Update'}
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default BlogEditScreen;

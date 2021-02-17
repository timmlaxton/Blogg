import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// Fetch all blogs
// GET /api/blogs
// Public

const getBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find({});
	res.json(blogs);
});

// Fetch single Blog
// GET /api/blogs/:id
// Public
const getBlogById = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog) {
		res.json(blog);
	} else {
		res.status(404);
		throw new Error('Blog not found');
	}
});

// Delete  Blog
// DELETE /api/blogs/:id
// Private
const deleteBlog = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog) {
		await blog.remove();
		res.json({ message: 'Blog has been deleted' });
	} else {
		res.status(404);
		throw new Error('Blog not found');
	}
});

// Create  Blog
// POST /api/blogs/:id
// Private
const createBlog = asyncHandler(async (req, res) => {
	const { heading, title, image, post } = req.body;
	const blog = new Blog({
		user: req.user._id,
		heading,
		title,
		image,
		post
	});

	const createdBlog = await blog.save();
	res.status(201).json(createdBlog);
});

// Update  Blog
// PUT /api/blogs/:id
// Private
const updateBlog = asyncHandler(async (req, res) => {
	const { heading, title, image, post } = req.body;
	const blog = await Blog.findById(req.params.id);
	if (blog) {
		(blog.heading = heading), (blog.title = title), (blog.post = post);

		if (image) {
			blog.image = image;
		}

		const updatedBlog = await blog.save();
		res.json(updatedBlog);
	} else {
		res.status(404);
		throw new Error('Blog not found');
	}
});

export { getBlogs, getBlogById, deleteBlog, createBlog, updateBlog };

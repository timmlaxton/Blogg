import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Blog from '../models/blogModel.js';

// Fetch all blogs
// GET /api/blogs
// Public

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const blogs = await Blog.find({});
		res.json(blogs);
	})
);

// Fetch single Blog
// GET /api/blogs/:id
// Public

router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const blog = await Blog.findById(req.params.id);

		if (blog) {
			res.json(blog);
		} else {
			res.status(404).json({ message: 'Blog not found' });
		}

		res.json(blog);
	})
);

export default router;

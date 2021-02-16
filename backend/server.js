import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import blogs from './data/blogs.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.get('/api/blogs', (req, res) => {
	res.json(blogs);
});

app.get('/api/blogs/:id', (req, res) => {
	const blog = blogs.find((p) => p._id === req.params.id);
	res.json(blog);
});

const PORT = process.env.NODE.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

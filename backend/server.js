const express = require('express');
const blogs = require('./data/blogs');

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

app.listen(5000, console.log('Server running on port 5000'));

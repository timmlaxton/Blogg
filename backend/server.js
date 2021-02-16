import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/blogs', blogRoutes);

const PORT = process.env.NODE.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import blogs from './data/blogs.js';
import User from './models/userModel.js';
import Blog from './models/blogModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Blog.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[0]._id;

		const sampleBlogs = blogs.map((blog) => {
			return { ...blog, user: adminUser };
		});

		await Blog.insertMany(sampleBlogs);
		console.log('Data Imported!');
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Blog.deleteMany();
		await User.deleteMany();

		console.log('Data Destroyed!');
		process.exit();
	} catch (err) {
		console.error(`${error}`);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}

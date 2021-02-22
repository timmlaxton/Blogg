import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

const blogSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		heading: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		featured: {
			type: Boolean,
			default: false
		},
		category: {
			type: String,
			required: true
		},
		post: {
			type: String,
			required: true
		},
		reviews: [reviewSchema],
		post: {
			type: String,
			required: true
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0
		},
		featured: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

import express from 'express';
const router = express.Router();
import { getBlogs, getBlogById, deleteBlog } from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getBlogs);
router.route('/:id').get(getBlogById).delete(protect, admin, deleteBlog);

export default router;

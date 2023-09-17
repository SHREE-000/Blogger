import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware';
import { createBlog, deleteBlog, getUserBlog, getOneBlog, updateBlog, getAllBlogs, getLimitBlogs, getFilteredBlogs} from '../controllers';

router.post('/createblog', verifyToken, createBlog);
router.get('/bloguser/:location/:search',verifyToken, getUserBlog);
router.get('/blogsingle/:id', getOneBlog);
router.put('/blogupdate/:id', verifyToken, updateBlog);
router.delete('/blogdelete/:id', verifyToken, deleteBlog);
router.get('/allblogs', getAllBlogs);
router.get('/filteredblogs/:location/:search', getFilteredBlogs);
router.get('/blogs/:location/:search/:limit', getLimitBlogs);

export default router;
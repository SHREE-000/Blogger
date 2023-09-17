import { Blog } from '../../models';

export const deleteBlog = async(req, res) => {
    try {
        const { id } = req.params;
        const newId = id.replace(":", "");
        const response = await Blog.findByIdAndDelete(newId);
        res.status(204).json(response);
    } catch (error) {
        throw new Error(error)
    }
};
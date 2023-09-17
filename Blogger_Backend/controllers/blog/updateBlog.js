import { Blog } from '../../models';

export const updateBlog = async(req, res) => {
    try {
        const {
            desc,
            location,
            media,
            title,
            topic
        } = req.body;

        const { contents } = media;
        const { id } = req.params;
        const newId = id.replace(":", "");
        const blog = await Blog.updateOne(
            {
                _id: newId
            },
            {
            desc,
            location,
            media: contents ? contents : media,
            title,
            topic,
            updatedAt: new Date()
        }); 
        res.status(200).json(blog);     
    } catch (error) {
        throw new Error(error)
    }      
};
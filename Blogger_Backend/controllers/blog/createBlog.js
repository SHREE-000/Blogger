import { Blog, User } from '../../models';

export const createBlog = async(req, res) => {
    try {
        const {
            desc,
            location,
            media,
            title,
            topic
        } = req.body;
        const user = await User.findById(req.user?.userId);
        const author = user.firstname + " " + user.lastname;

        const { contents } = media;
        const blog = await Blog.create({
            createdAt: new Date(),
            author,
            desc,
            location,
            media: contents,
            title,
            topic,
            userId: req.user?.userId,
        });

        return res.status(201).json(blog);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed, please try later")
    }
}
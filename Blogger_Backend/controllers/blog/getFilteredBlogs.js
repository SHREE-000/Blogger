import { Blog } from '../../models';

export const getFilteredBlogs = async(req, res) => {
    try {
        const { location, search } = req.params;
        const newLoc = location.replace(":", "");
        const newSearch = search.replace(":", "");
        let filteredblogs = null;
        if (newSearch) {
            filteredblogs = await Blog.find({
              $or: [
                { location: { $regex: newSearch, $options: 'i' } },
                { author: { $regex: newSearch, $options: 'i' } },
                { title: { $regex: newSearch, $options: 'i' } },
                { topic: { $regex: newSearch, $options: 'i' } }
              ]
            })
      
          } else {
            filteredblogs = await Blog.find({
              location: { $regex: newLoc, $options: 'i' }
            }) 
        }
        res.status(200).json(filteredblogs)
    } catch (error) {
        throw new Error(error);
    }
};
import { Blog } from '../../models';

export const getUserBlog = async(req, res) => {
    try {
        const userId = req.user.userId;
        const { location, search } = req.params;
        const newLoc = location.replace(":", "");
        const newSearch = search.replace(":", "");
        let filteredblogs = null;
        if (newSearch) {
            filteredblogs = await Blog.find({
                $and: [
                    { $or: [
                      { location: { $regex: newSearch, $options: 'i' } },
                      { author: { $regex: newSearch, $options: 'i' } },
                      { title: { $regex: newSearch, $options: 'i' } },
                      { topic: { $regex: newSearch, $options: 'i' } }
                    ]},
                    { userId }
                  ]
            })
      
          } else {
            filteredblogs = await Blog.find({
                $and: [
                    {
                    location: { $regex: newLoc, $options: 'i' }
                    },
                    { userId }
                  ]  
            }) 
        }
        return res.status(200).json({filteredblogs});
    } catch (error) {
        throw new Error(error)
    }            
};  
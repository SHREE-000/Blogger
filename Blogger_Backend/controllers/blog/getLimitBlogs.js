import { Blog } from "../../models";

export const getLimitBlogs = async (req, res) => {
  try {
    const { location, search, limit } = req.params;
    const newLoc = location.replace(":", "");
    const newSearch = search.replace(":", "");
    const newLimit = parseInt(limit.replace(":", ""));
    let skipCount = newLimit - 3;
    if (skipCount < 0) skipCount = 0;

    let limitBlogs = null;
    let totalCount = null;
    if (newSearch) {
      limitBlogs = await Blog.find({
        $or: [
          { location: { $regex: newSearch, $options: 'i' } },
          { author: { $regex: newSearch, $options: 'i' } },
          { title: { $regex: newSearch, $options: 'i' } },
          { topic: { $regex: newSearch, $options: 'i' } }
        ]
      })
        .skip(skipCount)
        .limit(3)
        .exec();

      totalCount = await Blog.countDocuments({
        $or: [
          { location: { $regex: newSearch, $options: 'i' } },
          { author: { $regex: newSearch, $options: 'i' } },
          { title: { $regex: newSearch, $options: 'i' } },
          { topic: { $regex: newSearch, $options: 'i' } }
        ]
      }).exec();

    } else {
      limitBlogs = await Blog.find({
        location: { $regex: newLoc, $options: 'i' }
      })
        .skip(skipCount)
        .limit(3)
        .exec();

      totalCount = await Blog.countDocuments({
        location: { $regex: newLoc, $options: 'i' }
      }).exec();
    }

    const response = {
      totalCount,
      limitBlogs
    }
    res.status(200).json(response);
  } catch (error) {
    throw new Error(error);
  }
};

import BlogModel from "../models/BlogModel.js";

//user view all blogs
export const userViewBlogs = async (req, resp) => {
  try {
    const blogs = await BlogModel.find({});
    resp.status(200).send({
      success: true,
      message: "Getting blogs Successfully",
      blogs,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in getting blogs data",
      err,
    });
  }
};

//user view single  blog on id base
export const userViewBlog = async (req, resp) => {
  try {
    const id = req.params.id;
    const blog = await BlogModel.find({ _id: id });
    resp.status(200).send({
      success: true,
      message: "Getting blog detail Successfully",
      blog,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in getting blog data",
      err,
    });
  }
};

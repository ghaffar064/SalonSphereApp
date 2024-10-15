import userModel from "../models/userModel.js";
export const adminPanel = (req, res) => {
  res.render("admin");
};

export const adminController = async (req, resp) => {
  try {
    const users = await userModel.find({});
    resp.status(200).send({
      success: true,
      message: "Getting User Successfully",
      users,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in getting users data",
      err,
    });
  }
};

//admin's only
export const getAdmins = async (req, resp) => {
  try {
    const admins = await userModel.find({ role: "1" });
    resp.status(200).send({
      success: true,
      message: "Getting admin's Successfully",
      admins,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in getting admin's data",
      err,
    });
  }
};

export const deleteUser = async (req, resp) => {
  try {
    const id = req.params.id;
    await userModel.deleteOne({ _id: id });
    resp.status(200).send({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in getting users data",
      err,
    });
  }
};

export const updateAdminRole = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the user by ID and check their current role
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Proceed with the update only if the user's role is 1
    if (user.role === 1) {
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { role: 0 },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "User role updated successfully to 0",
        user: updatedUser,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "No update needed, user role is not 1",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error updating user's role",
      err,
    });
  }
};

import BlogModel from "../models/BlogModel.js";
import contactUsModel from "../models/contactUsModel.js";
export const blogPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const img = req.file;

    // Validations
    if (!title) {
      return res.status(400).send({ message: "Title is required." });
    }
    if (!description) {
      return res.status(400).send({ message: "Description is required." });
    }
    if (!img) {
      return res.status(400).send({ message: "Image upload is required." });
    }

    const blogData = {
      title,
      description,
      img: img.filename, // Save the file path or handle it as needed
    };

    const blogPost = await new BlogModel(blogData).save();
    res.status(201).send({
      success: true,
      message: "Your blog has been submitted successfully.",
      blogPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "There was a server issue in form submission.",
      err,
    });
  }
};

//admin view all blogs
export const viewBlogs = async (req, resp) => {
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

//admin view single  blog on id base
export const viewBlog = async (req, resp) => {
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

//admin delete blog
export const deleteBlog = async (req, resp) => {
  try {
    const id = req.params.id;
    await BlogModel.deleteOne({ _id: id });
    resp.status(200).send({
      success: true,
      message: "blog deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in delete blog data",
      err,
    });
  }
};

//admin view contact forms
export const viewContactUsForm = async (req, resp) => {
  try {
    const contactQueries = await contactUsModel.find({});
    resp.status(200).send({
      success: true,
      message: "Getting contact forms Successfully",
      contactQueries,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Error in getting contact form  data",
      err,
    });
  }
};

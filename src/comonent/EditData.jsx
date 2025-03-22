import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom"; 
import { toast } from "react-toastify";

const EditBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    date: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
        setBlogData(response.data); 
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog post. Please try again.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`, blogData);
      console.log("Blog updated successfully:", response.data);
      toast.success("Blog updated successfully!");
      navigate("/admindashbord");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog post. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5 dark:bg-gray-800 dark:text-gray-200 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Blog Post</h2>
        <NavLink to="/admindashbord" className="bg-blue-500 text-white px-4 py-2 rounded">
          Dashboard
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content:</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            rows="5"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Author:</label>
          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date:</label>
          <input
            type="date"
            name="date"
            value={blogData.date}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Update Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;

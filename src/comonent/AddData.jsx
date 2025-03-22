import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    createdAt: new Date().toISOString().split("T")[0], // Default to today's date
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blogs`,
        formData
      );
      console.log("Blog added successfully:", response.data);
      toast.success("Blog post added successfully!");
      navigate("/admindashbord");

      // Reset form data
      setFormData({
        title: "",
        author: "",
        content: "",
        createdAt: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to add blog. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-lg dark:bg-[#420878] dark:text-gray-500 mx-auto p-5 bg-purple-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          Add New Blog Post
        </h2>
        <NavLink
          to="/admindashbord"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Dashboard
        </NavLink>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Blog Title */}
        <div>
          <label className="block dark:text-white text-sm font-medium">
            Blog Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Author Name */}
        <div>
          <label className="block dark:text-white text-sm font-medium">
            Author:
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block dark:text-white text-sm font-medium">
            Content:
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-40"
            required
          ></textarea>
        </div>

        {/* Blog Date */}
        <div>
          <label className="block dark:text-white text-sm font-medium">
            Publish Date:
          </label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;

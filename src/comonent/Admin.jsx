import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5 dark:bg-gray-900 dark:text-white bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard - Blog Management</h2>
        <NavLink to="/adddata" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Blog
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-white flex flex-col jus dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{blog.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
              </p>
              <p className="text-sm text-gray-500 mt-2">By {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}</p>

              <div className="flex justify-between items-center mt-4">
                <Link to={`/edit/${blog._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600 dark:text-gray-400">No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;

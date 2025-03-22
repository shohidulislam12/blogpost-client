import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs`);
      setBlogs(response.data);
    } catch (err) {
      setError("Failed to fetch blogs.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-5 min-h-screen bg-purple-300 dark:bg-[#420878] dark:text-white">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Blog Posts</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
              </p>
              <p className="text-sm text-gray-500 mt-2">By {blog.author} - {new Date(blog.createdAt).toLocaleDateString()}</p>

              <div className="mt-4">
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No blog posts available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

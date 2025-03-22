import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const BlogData = () => {
    const { id } = useParams(); 
    const [blogData, setBlogData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
                setBlogData(response.data); 
            } catch (error) {
                console.error("Error fetching blog:", error);
                setError("Failed to fetch blog post. Please try again.");
                toast.error("Failed to fetch blog post. Please try again.");
            }
        };

        fetchBlog();
    }, [id]);

    if (error) {
        return <p className="text-center text-red-500 mt-5">{error}</p>;
    }

    if (!blogData) {
        return <p className="text-center text-gray-500 mt-5">Loading...</p>;
    }

    return (
        <motion.div 
            className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white shadow-lg rounded-lg m-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{blogData.title}</h1>
            <p className="text-sm text-gray-500">By {blogData.author} - {new Date(blogData.createdAt).toLocaleDateString()}</p>

            <div className="mt-4 text-gray-800 dark:text-gray-300">
                <p className="leading-relaxed">{blogData.content}</p>
            </div>
        </motion.div>
    );
};

export default BlogData;

import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import DefaultUserCred from "./DefaultUserCred";

const Rejistar = () => {
  const navigate=useNavigate()
  const { creatuserUsingMailPass } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!password || !email) {
      setMessage("All fields are required!");
      return;
    }

    creatuserUsingMailPass(email, password)
      .then((user) => {
        console.log(user);
        navigate('/userdashbord')
        setMessage("Registration successful!");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Registration failed. Please try again.");
      });
  };

  return (
    <div className="max-w-screen-lg dark:bg-[#420878] dark:text-white flex md:flex-row flex-col cards mx-auto p-5 bg-purple-300  items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Register
        </h2>
        {message && (
          <p className="text-green-500 text-center font-medium">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input dark:text-gray-600 input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input dark:text-gray-600 input-bordered w-full mt-1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        {
          <p className="text-green-500 text-center font-medium">If You Already Rejistar Plese <Link className= "text-black dark:text-white" to='/login'>Login</Link></p>
        }
        <DefaultUserCred></DefaultUserCred>
      </div>
    </div>
  );
};

export default Rejistar;
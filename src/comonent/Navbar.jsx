import { useContext, useEffect, useState } from "react";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import { AuthContext } from "./auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const  navigate=useNavigate()
    const {google,user,logout,setUser,loading}=useContext(AuthContext)
  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );
if(loading){
    <span className="loading loading-spinner loading-lg"></span>
}
  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  const handlelogin=()=>{
   google()
   .then((result) => {
    const user = result.user;
 console.log(user)
  }).catch((error) => {
    console.log(error)
  });
  }
  const handleLogout=()=>{
   
    logout()
    navigate('/')
    setUser([])
  }
  return (
    <div className="navbar dark:bg-black dark:text-[#eae9fc] bg-[#dedcff]">
      <div className="flex-1">
        <a className=" font-bold text-xl">Blog Post</a>
      </div>
      <div className="flex-none">
      {user?.email && <p className="hidden  md:flex">Welcome {"  "}{user.email.split('@')[0]}</p>}
      {  user?.email? <button className="border p-1 border-blue-500" onClick={handleLogout}>Logout</button>:<Link to='/login' className="border p-1 border-blue-500" >LogIn</Link>}
      <Link to='/' className="border p-1 border-blue-500" >Home </Link>
  
      <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition"
    >
      {darkMode ?<IoIosSunny /> :<IoMdMoon />}
    </button>

        <div className="dropdown  dropdown-end">

          <div
            tabIndex={0}
            role="button"
            className="btn  btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
             
             {user?.photoURL?<img
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL}
              />:<img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />} 
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Navbar;

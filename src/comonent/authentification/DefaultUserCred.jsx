import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../auth/AuthProvider";


const DefaultUserCred = () => {

    const {signInWithMailPass}=useContext(AuthContext)
    const navigate=useNavigate()
        const handledefaultuser= ()=>{
       

            const email="gemyzoby@mailinator.com"
            const password="sifatsifat"
         //   console.log(email,password)
            signInWithMailPass(email ,password)
            .then((user) => {
         //  console.log(user)
           navigate('/userdashbord')
           return toast.success('sign in sucessfully')
              })
              .catch((error) => {
               
                return toast.error( error.message)
              });
            
    
        }
        const handledefaultAdmin= ()=>{
       

            const email="zaqageqa@mailinator.com"
            const password="sifatsifat"
         //   console.log(email,password)
            signInWithMailPass(email ,password)
            .then((user) => {
         //  console.log(user)
         navigate('/admindashbord')
           return toast.success('sign in sucessfully')
              })
              .catch((error) => {
               
                return toast.error( error.message)
              });
            
    
        }
    return (
        <div className="w-full dark:text-white">
                  <button
                        onClick={handledefaultuser}
                        className="flex items-center w-full my-2 justify-center  px-6 py-3 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:shadow-md dark:text-white  hover:bg-gray-100 "
                    >
                        <FaUser className="text-2xl mr-3" /> {/* Google Icon */}
                        <span className="text-sm font-medium">Get Default User Credential</span>
                    </button>
                  <button
                        onClick={handledefaultAdmin}
                        className="flex items-center w-full  justify-center px-6 py-3 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:shadow-md dark:text-white  hover:bg-gray-100 "
                    >
                        <FaUser className="text-2xl mr-3" /> {/* Google Icon */}
                        <span className="text-sm font-medium">Get Default Admin Credential</span>
                    </button>
        </div>
    );
};

export default DefaultUserCred;
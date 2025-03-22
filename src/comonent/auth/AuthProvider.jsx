import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,} from "firebase/auth";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";
import axios from "axios";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user,setUser]=useState([])
  const provider = new GoogleAuthProvider();
const google=()=>{
    setLoading(true)
   return  signInWithPopup(auth, provider)
   
}
const creatuserUsingMailPass = (email, password) => {
  setLoading(true);
  return createUserWithEmailAndPassword(auth, email, password);
};
const signInWithMailPass = (email, password) => {
  setLoading(true);
  return signInWithEmailAndPassword(auth, email, password);
};
const logout=()=>{
    setLoading(true)
   signOut(auth).then(() => {
        toast('sucessfully logOut')
      }).catch((error) => {
        toast(error)
      });
      return 
}
 useEffect(()=>{
  const unsubscribe=  onAuthStateChanged(auth, async(currentuser) => {
        if (currentuser?.email) {
     setUser(currentuser)
       //get token and store
       const useremail={email:currentuser?.email}
     axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`,useremail)
       .then(res=>{
        console.log('token',res)
        if( res.data.token){
         localStorage.setItem('token',res.data.token)
        }
       })

     } else {
       
       setUser(null);
       //remove token
       localStorage.removeItem('token')
     }
        setLoading(false)
      });
return ()=>unsubscribe()
},[user?.displayName])
console.log(user)
  const authinf = { google,user,logout,setUser,loading, setLoading ,signInWithMailPass,creatuserUsingMailPass };
  return (
    <AuthContext.Provider value={authinf}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

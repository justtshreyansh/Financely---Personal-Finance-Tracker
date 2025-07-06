import React, { useEffect } from "react";
import "./Header.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import a from "../assets/userImg.png";
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutFnc() {
    console.log("chal raha hai");
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully!");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financly</p>
      {user && (
        <div style={{display:"flex" , alignItems:"center",gap:"0.5rem"}}>
          <img src={user.photoURL?user.photoURL:a}  style={{borderRadius:"50%",width:"2rem",height:"2rem"}}/>
          <p className="logo link" onClick={logoutFnc}>
            LogOut
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;

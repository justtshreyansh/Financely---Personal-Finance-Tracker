import React, { useEffect } from "react";
import "./Header.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutFnc() {
    console.log("chal raha hai")
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged Out Successfully!");
          navigate('/');
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
      <p className="logo" >
        Financly
      </p>
      {user && (
        <p className="logo link" onClick={logoutFnc}>
          LogOut
        </p>
      )}
    </div>
  );
};

export default Header;

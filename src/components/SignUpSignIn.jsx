import React, { useState } from "react";
import "./SignUpSignIn.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";
import {toast} from "react-toastify";
import Input from "./Input";
import Button from "./Button";
const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[loading,setLoading] = useState(false);
  function signUpWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);

    console.log("confirm password", confirmPassword);

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" 
      
    ) {

      if(confirmPassword === password){
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("user",user)
          toast.success("User Created!");
          setLoading(false);
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          createDoc(user);
         
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
      }
      else{
        toast.error("Password and Confirm password is not matching!");
        setLoading(false);
      }
    }
    else{
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }
  function createDoc(user){
    
  }
  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financly.</span>
      </h2>
      <form>
        <Input
          label={"Full name"}
          state={name}
          setState={setName}
          placeholder={"John doe"}
          type={"text"}
        />

        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"Johndoe@gmail.com"}
          type={"email"}
        />

        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
          type={"password"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
          type={"password"}
        />
        <Button
        disabled={loading}
          text={loading?"Loading":"Sign using Email and Password"}
          onClick={signUpWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button text={loading?"Loading":"Sign using Google"} blue={true} />
      </form>
    </div>
  );
};

export default SignUpSignIn;

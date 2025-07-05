import React, { useState } from "react";
import "./SignUpSignIn.css";

import Input from "./Input";
import Button from "./Button";
const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState('');
  const[confirmPassword,setConfirmPassword] = useState('');
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
        />

        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"Johndoe@gmail.com"}
        />

        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button text={"Sign using Email and Password"}/>
        <p style={{textAlign:"center",margin:0}}>or</p>
        <Button text={"Sign using Google"} blue={true}/>
      </form>
    </div>
  );
};

export default SignUpSignIn;

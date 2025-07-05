import React, { useState } from "react";
import "./SignUpSignIn.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db  } from "../firebase";
import {doc, setDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
      if (confirmPassword === password) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashboard");
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
      } else {
        toast.error("Password and Confirm password is not matching!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt:new Date(),
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
    else{
      toast.error("Doc already exists");
      setLoading(false);
    }
  }
  function loginWithEmail() {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User logged In");
          navigate("/dashboard");
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }
  return (
    <>
      {login ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financly.</span>
          </h2>
          <form>
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

            <Button
              disabled={loading}
              text={loading ? "Loading" : "Login using Email and Password"}
              onClick={loginWithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              text={loading ? "Loading" : "Login using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLogin(!login)}>
              Or Don't Have An Account? Click Here
            </p>
          </form>
        </div>
      ) : (
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
              text={loading ? "Loading" : "Sign using Email and Password"}
              onClick={signUpWithEmail}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              text={loading ? "Loading" : "Sign using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLogin(!login)}>
              Or Have An Account? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpSignIn;

import React from 'react'
import Header from "../components/Header";
import "../App.css";
import SignUpSignIn from "../components/SignUpSignIn";
const SignUp = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'><SignUpSignIn/></div>
    </div>
  )
}

export default SignUp

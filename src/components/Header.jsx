import React from 'react'
import "./Header.css";
const Header = () => {
  function logoutFnc(){
    alert("Logout clikced")
  }
  return (
    <div className='navbar'>
      <p className="logo" style={{}}>Financly</p>
      <p className='logo link' onClick={logoutFnc}>LogOut</p>
    </div>
  )
}

export default Header

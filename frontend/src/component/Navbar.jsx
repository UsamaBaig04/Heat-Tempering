import React from 'react'
import logo1 from "../assets/logoTemp.jpeg";
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='brand-logo'>
        <img src={logo1} alt="" />
      </div>
      <div className='header-title'>
      DATA LOGGING OF TEMPERING FURNACE
      </div>
      <div className='logout'>
        <div></div>
        {/* <div className='brand-logo'><img src={logo2} alt="" /></div> */}
      </div>
    </div>
  )
}

export default Navbar

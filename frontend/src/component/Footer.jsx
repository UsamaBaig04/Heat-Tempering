import React from 'react'
import sas_footer_logo from "../assets/sas.png"
const Footer = () => {
    return (
        <footer className="footer-main">
            {/* <div className="d-flex justify-content-between align-items-center"> */}
            <div></div>
            <div className='footer-text'>
                &#169; 2023 by SAS AUTOMATION PVT. LTD.  All Rights Reserved.
            </div>
            <div className='footer-logo'>
                <img src={sas_footer_logo} alt="LOGO" />
                <div className="footer-logo-text" style={{ textAlign: "start" }}>
                <h6>SAS Automation</h6>
                </div>
            </div>
            {/* </div> */}
        </footer>
    )
}

export default Footer;

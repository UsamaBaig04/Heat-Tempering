import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti"
import { BiAnalyse } from "react-icons/bi"
import { NavLink } from "react-router-dom";
const Sidebar1 = () => {
    const [collapse, setCollapse] = useState(false);


    // onclick onClick class target

    function handleToggle() {
        setCollapse(collapse => !collapse);

    }
    return (
        <div>
            <div>
                <div className={collapse ? "sidebar1 close1" : "sidebar1"} >
                    <div className="menu-icon1" onClick={handleToggle}>
                        <TiThMenu />
                    </div>
                    <ul className="nav-links d-flex flex-column justify-content-between " style={{ height: "calc(78vh)" }}>
                        <div className='sidbar-body'>
                            <div className='links'>
                            <NavLink to={"/home"}>
                                <BiAnalyse />
                                <span className="link_name">Home</span>
                            </NavLink>
                            </div>


                            <div  className='links'>
                            <NavLink to={"/home"}>
                                <BiAnalyse />
                                <span className="link_name">Home</span>
                            </NavLink>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar1

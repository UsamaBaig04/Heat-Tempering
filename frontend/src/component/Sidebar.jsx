import React, { useState, useEffect } from 'react';
import { TiThMenu } from "react-icons/ti"
import { BiAnalyse } from "react-icons/bi"
import { HiOutlineDocumentReport } from "react-icons/hi"
import { AiFillCaretDown } from "react-icons/ai"
import { RxCountdownTimer } from "react-icons/rx"
import { NavLink } from "react-router-dom";
import sas_a from "../assets/sas.png"
import DemoModal from './DemoModal1';
import { reportTypes } from '../constants/ReportTypes';
// import sas_d from "../assets/sas-dark.png"
// import LogoutF from './Logout';
import { connect } from 'react-redux';
import * as reportActions from "../redux/action/report"
import * as reportTypeActions from "../redux/action/reportType"
import * as resetActions from "../redux/action/reset"
import { useLocation } from 'react-router-dom';
import {handleContentWidth} from '../App'


const Sidebar = ({ dispatchUpdateReport, dispatchUpdateReportType, resetStore, widthS, setWidthS }) => {

    const [collapse, setCollapse] = useState(true);
    const [show, setShow] = useState(false);
    const [report, setReport] = useState()
    const [reportType, setReportType] = useState()
    // reportType && console.log(reportType)
    // report && console.log(report)

    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => setShow(false);


    const showMenuClick = (event) => {
        event.currentTarget.parentElement.parentElement.classList.toggle("showMenu");
        setReport(document.getElementById("parent-report").innerHTML)
        dispatchUpdateReport(document.getElementById("parent-report").innerHTML)

    }
    // onclick onClick class target

    function handleToggle() {
        setCollapse(collapse => !collapse);

    }
    const handleLogoutSidebar = () => {
        localStorage.clear();
        window.location.reload();
    }

    // Handle Store Reset on Chnage Routes

    const usePrevious = (value) => {
        const ref = React.useRef()
        React.useEffect(() => { ref.current = value })

        return ref.current
      }

      const useLocationChange = (action) => {
        const location = useLocation('/')
        const prevLocation = usePrevious(location)
        React.useEffect(() => { 
          action(location, prevLocation) 
        }, [location])
      }

      useLocationChange((location, prevLocation) => { 
        console.log('changed from',prevLocation && prevLocation.pathname, 'to', location && location.pathname) 
        if((prevLocation && prevLocation.pathname) != (location && location.pathname)){
            console.log("Route Changed")
            resetStore()
        }
      })

      collapse ? setWidthS("96%"): setWidthS("83%")


    return (
        <>
                <div className={collapse ? "sidebar close" : "sidebar"} >
                    <div className="menu-icon" onClick={handleToggle}>
                        <TiThMenu />
                    </div>
                    <ul className="nav-links d-flex flex-column justify-content-between " style={{ height: "calc(78vh)" }}>
                        <div>
                            <li className='links'>
                                <NavLink className="navlinks"  >
                                    <a onClick={showMenuClick}>
                                        <i className="bx " ><HiOutlineDocumentReport /></i>
                                        <span className="link_name" id='parent-report'>Reports</span>
                                    </a>
                                    <i className="bx bxs-chevron-down arrow" onClick={showMenuClick} ></i>
                                </NavLink>

                                <ul className="sub-menu ">
                                    {/* 
                                    {
                                        reportTypes.map((item, index) => (
                                            <li>
                                                <div>
                                                    <a key={index} onClick={() => [handleShow(), setReportType(item)]}>{item}</a>
                                                </div>
                                            </li>
                                        ))
                                    } */}

                                     <li>
                                        <NavLink to={"/user/data-report"} onClick={() => dispatchUpdateReportType(`Data Report`)} style={({ isActive }) =>
                                            (isActive ? { color: 'red' } : { color: 'black' })}>
                                            DATA REPORT
                                        </NavLink>
                                    </li>

                                    {/* <li>
                                        <NavLink to={"/user/data-report"} onClick={() => dispatchUpdateReportType(`Data Report`)} style={({ isActive }) =>
                                            (isActive ? { color: 'red' } : { color: 'black' })}>
                                            TREND REPORT
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/user/alarm-report"} onClick={() => dispatchUpdateReportType(`Alarm Report`)} style={({ isActive }) =>
                                            (isActive ? { color: 'red' } : { color: 'black' })}>
                                            ALARM REPORT
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink to={"/user/event-report"} onClick={() => dispatchUpdateReportType(`Event Report`)} style={({ isActive }) =>
                                            (isActive ? { color: 'red' } : { color: 'black' })}>
                                            EVENT REPORT
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/user/audit-report"} onClick={() => dispatchUpdateReportType(`Audit Report`)} style={({ isActive }) =>
                                            (isActive ? { color: 'red' } : { color: 'black' })}>
                                            AUDIT REPORT
                                        </NavLink>
                                    </li> */}
                                </ul>

                            </li>



                            {/* <li className='links'>
                                <NavLink to={"/down-time/data-report"} className="navlinks">
                                    <a onClick={showMenuClick}>
                                        <i className="bx " ><RxCountdownTimer /></i>
                                        <span className="link_name">Intervention Reports</span>
                                    </a>
                                    <i className="bx bxs-chevron-down arrow" onClick={showMenuClick}></i>

                                </NavLink>
                                <ul className="sub-menu ">
                                    <li>
                                        <NavLink to={"/down-time/data-report"}>
                                            Data Report
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink to={"/down-time/alarm-report"}>
                                            Alarm Report
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/down-time/Event-report"}>
                                            Event Report
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}

                            {/* <li className='links'>
                                <NavLink to={"/analysis/data-report"} className="navlinks" >
                                    <a onClick={showMenuClick}>
                                        <i className="bx " ><BiAnalyse /></i>
                                        <span className="link_name">Analysis Reports</span>
                                    </a>
                                    <i className="bx bxs-chevron-down arrow" onClick={showMenuClick}></i>
                                </NavLink>

                                <ul className="sub-menu ">
                                    <li>
                                        <NavLink to={"/analysis/data-report"}>
                                            Data Report
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink to={"/analysis/alarm-report"}>
                                            Alarm Report
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/analysis/Event-report"}>
                                            Event Report
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <hr /> */}












                            {/* <li >
                                <div className="iocn-link">
                                    <NavLink to={"/dashboard-Knitter-machine"}>
                                        <a href="#">
                                            <i className="bx bxs-dashboard" />
                                            <span className="link_name">Dashboard</span>
                                        </a>
                                    </NavLink>

                                    <i className="bx bxs-chevron-down arrow" onClick={showMenuClick} />
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Dashboard</a></li>
                                    <li>
                                        <NavLink to={"/dashboard-Knitter-machine"}>
                                            <a href="#">Knitter Machine</a>
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard-coater-machine"}>
                                            <a href="#">Coater Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dashboard-gluing-machine"}>
                                            <a href="#">Gluing Machine</a>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}

                            {/*
                            <li>
                                <div className="iocn-link">
                                    <NavLink to={"/production-report-knitter"}>
                                        <a href="#">
                                            <i className="bx bx-book-alt" />
                                            <span className="link_name">Production </span>
                                        </a>
                                    </NavLink>
                                    <i className="bx bxs-chevron-down arrow" onClick={showMenuClick} />
                                </div>
                                <ul className="sub-menu ">
                                    <li><a className="link_name" href="#">Production Report</a></li>
                                    <li>
                                        <NavLink to={"/production-report-knitter"}>
                                            <a href="#">Knitter Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/production-report-coater"}>
                                            <a href="#">Coater Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/production-report-gluing"}>
                                            <a href="#">Gluing Machine</a>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li>
                                <div className="iocn-link">
                                    <NavLink to={"/parameter-report-knitter"}>
                                        <a href="#">
                                            <i className='bx bxs-guitar-amp'></i>
                                            <span className="link_name">Parameter</span>
                                        </a>
                                    </NavLink>
                                    <i className="bx bxs-chevron-down arrow " onClick={showMenuClick} />
                                </div>
                                <ul className="sub-menu ">
                                    <li><a className="link_name " href="#">Parameter Report</a></li>
                                    <li>
                                        <NavLink to={"/parameter-report-knitter"}>
                                            <a href="#">Knitter Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/parameter-report-coater"}>
                                            <a href="#">Coater Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/parameter-report-gluing"}>
                                            <a href="#">Gluing Machine</a>
                                        </NavLink>
                                    </li>
                                </ul>

                            </li>
                            <li>

                                <div className="iocn-link">
                                    <NavLink to={"/stoppage-report-knitter"}>
                                        <a href="#">
                                            <i className="bx bx-stop-circle" />
                                            <span className="link_name">Stoppage </span>
                                        </a>
                                    </NavLink>
                                    <i className="bx bxs-chevron-down arrow " onClick={showMenuClick} />
                                </div>
                                <ul className="sub-menu ">
                                    <li><a className="link_name " href="#">Stoppage Report</a></li>
                                    <li>
                                        <NavLink to={"/stoppage-report-knitter"}>
                                            <a href="#">Knitter Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/stoppage-report-coater"}>
                                            <a href="#">Coater Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/stoppage-report-gluing"}>
                                            <a href="#">Gluing Machine</a>
                                        </NavLink>
                                    </li>
                                </ul>

                            </li>
                            <li>
                                <div className="iocn-link">
                                    <NavLink to={"/data-entry-knitter"}>
                                        <a href="#">
                                            <i className="bx bx-data" />
                                            <span className="link_name">Data Entry</span>
                                        </a>
                                    </NavLink>
                                    <i className="bx bxs-chevron-down arrow " onClick={showMenuClick} />
                                </div>
                                <ul className="sub-menu ">
                                    <li><a className="link_name " href="#">Data Entry</a></li>
                                    <li>
                                        <NavLink to={"/data-entry-knitter"}>
                                            <a href="#">Knitter Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/data-entry-coater"}>
                                            <a href="#">Coater Machine</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/data-entry-gluing"}>
                                            <a href="#">Gluing Machine</a>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}
                        </div>

                        {/* <div>
                            <li >
                                <div className="profile-details">
                                    <div className="profile-content ">
                                        <img src={sas_a} alt="profileImg" />
                                        <div>
                                        <div className="job">SAS</div>
                                        <div className="job">AUTOMATION</div>
                                        </div>

                                    </div>

                                    <i className="bx bx-log-out" onClick={handleLogoutSidebar}>
                                        
                                    </i>
                                </div>
                            </li>
                        </div> */}
                    </ul>
                </div>

            <DemoModal show={show} handleClose={handleClose} />
        </>
    )
}


const mapDispatchToProps = ((state) => ({
    dispatchUpdateReport: state.Report.dispatchUpdateReport,
    dispatchUpdateReportType: state.ReportType.dispatchUpdateReportType,
}),
    { ...reportActions, ...reportTypeActions, ...resetActions })

const withConnect = connect(null, mapDispatchToProps)


export default (withConnect)(Sidebar)
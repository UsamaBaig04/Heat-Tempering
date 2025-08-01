import React, { useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import "./style/navbar.css"
import "./style/sidebar.css"
import "./style/sidebar.css"
import "./style/footer.css"
import "./style/application-list.css"
import "./style/filter-panel.css"
import "./style/report.css"
import "./style/react-table.css"
import "./style/graph-modal.css"
import Footer from './component/Footer';
import { Route, Routes } from "react-router-dom"
import UserDataReports from './component/Pages/UserDataReports';
import GetData from './component/Pages/UserDataReports';
import UserAlarmReports from './component/Pages/UserAlarmReports';
// import UserEvenetReports from './component/Pages/UserEvenetReports';
// import UserDataApplication from './component/Pages/UserDataApplication';
import { BrowserRouter as Provider } from "react-router-dom"
import ExportReport from './component/ExportReport';
// import UserAuditReports from './component/Pages/UserAuditReports';
import useWindowDimensions from './component/Responsive';
import { useState } from 'react';



const App = (widthSidebar) => {
  const [widthS , setWidthS] = useState("")
  const { height, width } = useWindowDimensions();



  return (
    <>
      <Provider>
        <div style={{ height: "100vh" }}>
          <Navbar />
          <div style={{ display: "flex", width:width}}>
            <Sidebar  setWidthS={setWidthS}/>
            <div style={{ width:widthS}}>
              <Routes>
                <Route path='/' element={<UserDataReports />} />
                <Route path='/user/data-report' element={<UserDataReports />} />
                <Route path='/user/alarm-report' element={<UserAlarmReports />} />
                {/* <Route path='/user/event-report' element={<UserEvenetReports />} />
                <Route path='/user/audit-report' element={<UserAuditReports />} /> */}

                <Route path='*' element={<UserDataReports />} />

              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default App;

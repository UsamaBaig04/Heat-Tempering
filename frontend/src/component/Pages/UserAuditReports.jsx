// import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button';
// import { ApplicationList } from "../../constants/ApplicationList"
// // import { planList } from "../../constants/PlanList"
// import { areaList } from "../../constants/AreaList"
// import { roomList } from "../../constants/RoomList"
// import { areaEMSList } from "../../constants/AreaList"
// import { emsRoomList } from "../../constants/EMSRoomList"
// import { DateRangePicker } from 'rsuite';
// import "rsuite/dist/rsuite.css";
// import * as applicationActions from "../../redux/action/application";
// import * as roomActions from "../../redux/action/room";
// import * as areaActions from "../../redux/action/area";
// import * as dateTimeActions from "../../redux/action/datetime";
// import * as resetActions from "../../redux/action/reset"
// import ReactTable from "react-table";
// import 'react-table/react-table.css';
// import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
// import { getparams } from '../../redux/action/data'
// import { getUserAuditReportData } from '../../redux/action/data'
// import { dispatchDataRequest } from '../../redux/action/data'
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import ExportPdf from '../ExportPdf';
// import { data } from '../AlarmReportDemoData';
// import useWindowDimensions from '../Responsive'

// import Form from 'react-bootstrap/Form';

// const UserAuditReports = ({ items,
//   report, reportType, application,
//   area, areaid, room, dispatchUpdateApplication, dispatchUpdateRoom,
//   dispatchUpdateArea, dispatchUpdateDateTime, startDate, endDate, roomid, resetStore, tableColumn, dataLoader }) => {

//   const [searchparams, setSearchParams] = useSearchParams();
//   const [dateValue, setDateValue] = useState()
//   const [newRoomList, setNewRoomList] = useState()
//   const [inputValue, setInputValue] = useState('');

//   const [pageSizeNew, setPageSizeNew] = useState()
//   const [pageNumber, setPageNumber] = useState(1)

//   const defaultPageSize = [10, 50, 100, 500];



//   function reset_PageNumber() {
//     var pageN = document.getElementsByTagName("input")
//     console.log(pageN)
//     pageN[2].value = 1
//   }

//   let sleep = ms => {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   };

//   function reset_PageSize() {
//     setPageSizeNew(10)
//     setPageNumber(1)
//     sleep(2000).then(() => {
//       reset_PageNumber()
//     });
//   }

//   function reset_Store_Table() {
//     resetStore()
//     sleep(2000).then(() => {
//       reset_PageNumber()
//     });
//   }


//   const { height, width } = useWindowDimensions();

//   const handleSearch = (event) => {
//     let value = event.target.value
//     const fullValue = value.charAt(0).toUpperCase() + value.slice(1);
//     setInputValue(fullValue)
//     //setInputValue(value)
//   }


//   const handleRoomList = (arId) => {
//     if ((arId) === 1) {
//       setNewRoomList(roomList[0])
//     } else if ((arId) === 2) {
//       setNewRoomList(roomList[1])
//     } else if ((arId) === 3) {
//       setNewRoomList(roomList[2])
//     }
//   }

//   // Navigation start
//   var navigate = useNavigate();
//   function handleNavigation() {
//     navigate('/user/audit-report');
//   };
//   // Navigation end

//   let isDisabledRoom = true;
//   let isDisabledArea = true;
//   let isDisbaledDate = true;
//   let isDisbaledProceed = true;


//   //area dropdown disable enable
//   if (application) {
//     isDisabledArea = false
//   }
//   //area dropdown disable enable 


//   // room dropdown
//   if (area) {
//     isDisabledRoom = false
//   }
//   // roomlist dropdown

//   // daterange diasble enable
//   if (area) {
//     isDisbaledDate = false
//   }
//   // daterange diasble enable


//   // Proceed diasble enable
//   // if (application == 'LAF ANNUNCIATOR SYSTEM' && areaid && startDate && endDate) {
//   if (application && areaid && startDate && endDate) {
//     isDisbaledProceed = false
//   }
//   //Proceed diasble enable


//   // react table columns start

//   const columns = [
//     {
//       Header: "Date Time", accessor: "TS", width: width / 7
//     },
//     {
//       Header: "Variable", accessor: "Variable", width: width / 4
//     },
//     // {
//     //   Header: "Message", accessor: "Message", width: width / 4
//     // },
//     // {
//     //   Header: "Device", accessor: "Room", width: width / 4
//     // },
//     {
//       Header: "Previous Value", accessor: "PreviousValue", width: width / 4
//     },
//     {
//       Header: "Modified Value", accessor: "Value", width: width / 14
//     },
//     {
//       Header: "User Name", accessor: "UserName", width: width / 7
//     },
//     {
//       Header: "Comment", accessor: "Comment", width: width / 10
//     },
//   ]
//   // react table columns end

//   // date range picker value 
//   const getDateValue = (date) => {
//     setDateValue(date)
//   }

//   const getAreaList = (app) => {
//     if (app === "EMS") {
//       return areaEMSList
//     }
//     else if (app === "LAF ANNUNCIATOR SYSTEM" || "BMS") {
//       return areaList
//     }
//   };

//   return (
//     <div className='user-report'>

//       {/* <code> &nbsp; {report} -&gt; {reportType}</code> */}

//       <div className='filter-panel'>

//         {/* apllication Filter */}
//         <select
//           className='option-select-dropdown'
//           value={application} // ...force the select's value to match the state variable...
//           onChange={e => {
//             dispatchUpdateApplication(e.target.value);
//             setSearchParams(createSearchParams({ app: e.target.value }))
//           }} // ... and update the state variable on any change!
//         >
//           <option hidden>Select Application</option>
//           {ApplicationList && ApplicationList.map((items, index) => {
//             return (
//               <option key={index} value={items}>{items}</option>
//             )
//           })}
//         </select>

//         {/* Area Filter */}
//         <select
//           className='option-select-dropdown'
//           disabled={isDisabledArea}
//           value={area} // ...force the select's value to match the state variable...
//           onChange={e => {
//             getAreaList(application).map((item, index) => {
//               if (e.target.value == item.name) {
//                 dispatchUpdateArea(item.name, item.id);
//                 setSearchParams(prev => ([...prev.entries(), ['area', item.name]]));
//                 handleRoomList(item.id)
//               }
//             })
//           }} // ... and update the state variable on any change!
//         >
//           <option hidden>Select Area</option>
//           {
//             getAreaList(application).map((item, index) => (
//               <option key={index} value={item.name} >{item.name}</option>
//             ))
//           }
//         </select>      
        
//         {/* Room Filter */}
//         {/* <Dropdown>
//         <Dropdown.Toggle variant="white" id="dropdown-basic" disabled={isDisabledRoom} style={{ width: "18vw" }}>
//           {room ? room : "Select Room"}
//         </Dropdown.Toggle>

//         <Dropdown.Menu className='dropdown-menu' >

//           {
//             // newRoomList.map((items, index) => (
//             newRoomList && newRoomList.map((item, index) => (
//               // console.log(item)
//               <Dropdown.Item key={index}
//                 onClick={(e) => { dispatchUpdateRoom(item.name, item.id); setSearchParams(prev => ([...prev.entries(), ['room', (item.name)]])); }}
//               >
//                 {item.name}
//               </Dropdown.Item>
//             ))
//             // ))
//           }
//         </Dropdown.Menu>
//       </Dropdown> */}


//         {/* Date Range Filter strat*/}
//         <DateRangePicker
//           format="yyyy-MM-dd HH:mm:ss"
//           className='date-range'
//           placeholder="Select Date Range"
//           placement='bottomEnd'
//           value={dateValue && dateValue}
//           disabled={isDisbaledDate}
//           cleanable={false}
//           onChange={(date) => {
//             dispatchUpdateDateTime(date[0], date[1]);
//             setSearchParams(prev => ([...prev.entries(), ['startDate', date[0]], ['endDate', date[1]]]));
//             getDateValue(date);
//           }}
//         />
//         {/* Date Range Filter end*/}

//         {/* Proceed to api call start*/}
//         <Button
//           variant='white'
//           className='reset-btn'
//           disabled={isDisbaledProceed}
//           onClick={() => { getUserAuditReportData(application, areaid, roomid, startDate, endDate); reset_PageSize();dispatchDataRequest() }}
//         >
//           Proceed
//         </Button>
//         {/* Proceed to api call end*/}

//         {/* reset button start */}
//         <Button
//           variant='white'
//           className='reset-btn'
//           onClick={() => { reset_Store_Table(); handleNavigation(); setDateValue([]); }}
//         >
//           Reset
//         </Button>
//         {/* reset button end */}

//       </div>

//       <div className='report-table'>
//         <div className='table-title'>
//           <div style={{ fontSize: "calc(1.6vw)" }}>User Audit Report</div>
//           <div style={{ height: "4.5vh", display: "flex" }}>
//             {/* <input type="search" className='search-bar' onChange={(event) => handleSearch(event)} placeholder="Search User"/> */}
//             <Form.Control type="text" placeholder="Search User" className='search-bar' onChange={(event) => handleSearch(event)} />
//             <ExportPdf
//               columns={columns}
//               items={items}
//               name="AUDIT REPORT"
//               appl={application}
//               area={area}
//               room={room}
//               startDate={startDate}
//               endDate={endDate}
//               chkdBy=""
//               verifiedBy=""
//             />
//           </div>
//         </div>

//         <ReactTable
//           data={items && items.filter((data) => (data.UserName || data.UserName == "") && data.UserName.search(inputValue) != -1)}
//           //data={items}
//           columns={columns}
//           loading={dataLoader}
//           defaultPageSize={10}
//           pageSizeOptions={defaultPageSize}
//           onPageSizeChange={(number) => setPageSizeNew(number)}
//           pageSize={pageSizeNew}
//           onPageChange={(number) => setPageNumber(number + 1)}
//           page={pageNumber - 1}
//           style={{ textAlign: "center", height: "90%", fontSize: "1vw" }}
//         // showPagination={false} 
//         // defaultPageSize={5}
//         />
//       </div>
//     </div>
//   )
// }



// const mapDispatchToProps = ((state) => ({
//   dispatchUpdateApplication: state.Application.dispatchUpdateApplication,
//   dispatchUpdateRoom: state.Room.dispatchUpdateRoom,
//   dispatchUpdateArea: state.Area.dispatchUpdateArea,
//   dispatchUpdateDateTime: state.DateTime.dispatchUpdateDateTime,
// }),
//   { ...applicationActions, ...roomActions, ...areaActions, ...dateTimeActions, ...resetActions })


// const mapStateToProps = (state => ({
//   report: state.Report.report,
//   reportType: state.ReportType.reportType,
//   application: state.Application.application,
//   area: state.Area.area,
//   areaid: state.Area.areaid,
//   room: state.Room.room,
//   roomid: state.Room.roomid,
//   startDate: state.DateTime.startDate,
//   endDate: state.DateTime.endDate,
//   items: state.Data.items,
//   tableColumn: state.Data.tableColumn,
//   dataLoader: state.Data.loader
// }))


// const withConnect = connect(mapStateToProps, mapDispatchToProps)

// export default (withConnect)(UserAuditReports)

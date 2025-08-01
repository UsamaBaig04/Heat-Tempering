import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { ApplicationList } from "../../constants/ApplicationList"
// import { planList } from "../../constants/PlanList"
import { areaList } from "../../constants/AreaList"
import { roomList } from "../../constants/RoomList"
import { areaEMSList } from "../../constants/AreaList"
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import * as applicationActions from "../../redux/action/application";
import * as roomActions from "../../redux/action/room";
import * as areaActions from "../../redux/action/area";
import * as dateTimeActions from "../../redux/action/datetime";
import * as resetActions from "../../redux/action/reset"
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import { getUserAlarmReportData } from '../../redux/action/data'
import { dispatchDataRequest } from '../../redux/action/data'
import "jspdf-autotable";
import ExportPdf from '../ExportPdf';
import useWindowDimensions from '../Responsive'

import Form from 'react-bootstrap/Form';



const UserAlarmReports = ({ items,
  report, reportType, application,
  area, areaid, room, dispatchUpdateApplication, dispatchUpdateRoom,
  dispatchUpdateArea, dispatchUpdateDateTime, startDate, endDate, roomid, resetStore, tableColumn,dataLoader }) => {

  const [searchparams, setSearchParams] = useSearchParams();
  const [dateValue, setDateValue] = useState()
  const [newRoomList, setNewRoomList] = useState()
  const [inputValue, setInputValue] = useState('');

  const [pageSizeNew, setPageSizeNew] = useState()
  const [pageNumber, setPageNumber] = useState(1)

  const defaultPageSize = [10, 50, 100, 500];


  function reset_PageNumber() {
    var pageN = document.getElementsByTagName("input")
    console.log(pageN)
    pageN[2].value = 1
  }

  let sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  function reset_PageSize() {
    setPageSizeNew(10)
    setPageNumber(1)
    sleep(2000).then(() => {
      reset_PageNumber()
    });
  }

  function reset_Store_Table() {
    resetStore()
    sleep(2000).then(() => {
      reset_PageNumber()
    });
  }


  const { height, width } = useWindowDimensions();

  const handleSearch = (event) => {
    let value = event.target.value.toUpperCase();
    setInputValue(value)
    // let result = [];
    // console.log(value);
    // items = items.filter((data) => { return data.user.search(value) != -1; });
    // setFilteredData(result);
  }

  const handleRoomList = (arId) => {
    if ((arId) === 1) {
      setNewRoomList(roomList[0])
    } else if ((arId) === 2) {
      setNewRoomList(roomList[1])
    } else if ((arId) === 3) {
      setNewRoomList(roomList[2])
    }
  }

  // console.log("items", items)
  // console.log("dateValue", dateValue)

  // const getApp = searchparams.get("app");
  // const getRoom = searchparams.get("room");
  // const getArea = searchparams.get("area");
  // const getStartdate = searchparams.get("startDate");
  // const getEndDate = searchparams.get("endDate")

  // if (getApp && getRoom && getArea && getStartdate && getEndDate) {
  //   getparams(application, room, roomid, areaid, startDate, endDate)
  // }

  // console.log("queryparams", getApp, getRoom, getArea, getStartdate, getEndDate)

  // Navigation start
  var navigate = useNavigate();
  function handleNavigation() {
    navigate('/user/alarm-report');
  };
  // Navigation end

  let isDisabledRoom = true;
  let isDisabledArea = true;
  let isDisbaledDate = true;
  let isDisbaledProceed = true;


  //area dropdown disable enable
  if (application) {
    isDisabledArea = false
  }
  //area dropdown disable enable 


  // room dropdown
  if (area) {
    isDisabledRoom = false
  }
  // roomlist dropdown

  // daterange diasble enable
  if (area) {
    isDisbaledDate = false
  }
  // daterange diasble enable


  // Proceed diasble enable
  // if (application == 'LAF ANNUNCIATOR SYSTEM' && areaid && startDate && endDate) {
  if (application && areaid && startDate && endDate) {
    isDisbaledProceed = false
  }
  //Proceed diasble enable


  // react table columns start

  const alarmColumns = [
    {
      Header: "Alarm On Time", accessor: "alarmOn", width: width / 6
    },
    {
      Header: "Alarm Off Time", accessor: "alarmOff", width: width / 6
    },
    {
      Header: "Acknowledged Time", accessor: "acknowledgeTime", width: width / 6
    },
    {
      Header: "Message", accessor: "message", width: width / 3
    },
  ]




  // react table columns end


  // date range picker value 
  const getDateValue = (date) => {
    setDateValue(date)
  }

  const getAreaList = (app) => {
    if (app === "EMS") {
      return areaEMSList
    }
    else if (app === "LAF ANNUNCIATOR SYSTEM" || "BMS") {
      return areaList
    }
  };

  return (
    <div className='user-report'>

      {/* <code> &nbsp; {report} -&gt; {reportType}</code> */}

      <div className='filter-panel'>

        {/* apllication Filter */}
        {/* <select
          className='option-select-dropdown'
          value={application} // ...force the select's value to match the state variable...
          onChange={e => {
            dispatchUpdateApplication(e.target.value);
            setSearchParams(createSearchParams({ app: e.target.value }))
          }} // ... and update the state variable on any change!
        >
          <option hidden>Select Application</option>
          {ApplicationList && ApplicationList.map((items, index) => {
            return (
              <option key={index} value={items}>{items}</option>
            )
          })}
        </select> */}




        {/* Plan Filter */}
        {/* <Dropdown>
          <Dropdown.Toggle variant="white" id="dropdown-basic">
            {selectedPlan ? selectedPlan : "Select Plan"}
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-menu' >
            {planList.map((item, index) => (
              <Dropdown.Item key={index} onClick={(e) => setPlan(item)}>{item}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> */}

        {/* Area Filter */}
        {/* <select
          className='option-select-dropdown'
          disabled={isDisabledArea}
          value={area} // ...force the select's value to match the state variable...
          onChange={e => {
            getAreaList(application).map((item, index) => {
              if (e.target.value == item.name) {
                dispatchUpdateArea(item.name, item.id);
                setSearchParams(prev => ([...prev.entries(), ['area', item.name]]));
                handleRoomList(item.id)
              }
            })
          }} // ... and update the state variable on any change!
        >
          <option hidden>Select Area</option>
          {
            getAreaList(application).map((item, index) => (
              <option key={index} value={item.name} >{item.name}</option>
            ))
          }
        </select> */}

        {/* Room Filter */}

        <DateRangePicker
          format="yyyy-MM-dd HH:mm:ss"
          className='date-range'
          placeholder="Select Date Range"
          placement='bottomEnd'
          value={dateValue && dateValue}
          //disabled={isDisbaledDate}
          cleanable={false}
          onChange={(date) => {
            dispatchUpdateDateTime(date[0], date[1]);
            setSearchParams(prev => ([...prev.entries(), ['startDate', date[0]], ['endDate', date[1]]]));
            getDateValue(date);
          }}
        />
        {/* Date Range Filter end*/}

        {/* Proceed to api call start*/}
        <Button
          variant='white'
          className='reset-btn'
          // disabled={isDisbaledProceed}
          onClick={() => { getUserAlarmReportData(application, areaid, roomid, startDate, endDate); reset_PageSize();dispatchDataRequest() }}
        >
          Proceed
        </Button >
        {/* Proceed to api call end*/}

        {/* reset button start */}
        <Button
          variant='white'
          className='reset-btn'
          onClick={() => { reset_Store_Table(); handleNavigation(); setDateValue([]); }}
        >
          Reset
        </Button>
        {/* reset button end */}
      </div>

      <div className='report-table'>
        <div className='table-title'>
          <div style={{ fontSize: "calc(1.6vw)" }}>Alarm Report</div>
          <div style={{ height: "4.5vh", display: "flex", alignItems:"center" }}>
            {/* <input type="search" className='search-bar' onChange={(event) => handleSearch(event)} placeholder="Search User"/> */}
            {/* <Form.Control type="text" placeholder="Search User" className='search-bar' onChange={(event) => handleSearch(event)} /> */}
            <ExportPdf
              columns={alarmColumns}
              items={items}
              name="ALARM REPORT"
              // appl={application}
              // area={area}
              // room={room}
              startDate={startDate}
              endDate={endDate}
              chkdBy=""
              verifiedBy=""
            />
          </div>
        </div>

        <ReactTable
          data={items}
          // data={items}
          columns={alarmColumns}
          loading={dataLoader}
          defaultPageSize={10}
          pageSizeOptions={defaultPageSize}
          onPageSizeChange={(number) => setPageSizeNew(number)}
          pageSize={pageSizeNew}
          onPageChange={(number) => setPageNumber(number + 1)}
          page={pageNumber - 1}
          style={{ textAlign: "center", height: "90%", fontSize: "1vw" }}
        />
      </div>
    </div>
  )
}



const mapDispatchToProps = ((state) => ({
  dispatchUpdateApplication: state.Application.dispatchUpdateApplication,
  dispatchUpdateRoom: state.Room.dispatchUpdateRoom,
  dispatchUpdateArea: state.Area.dispatchUpdateArea,
  dispatchUpdateDateTime: state.DateTime.dispatchUpdateDateTime,
}),
  { ...applicationActions, ...roomActions, ...areaActions, ...dateTimeActions, ...resetActions })


const mapStateToProps = (state => ({
  report: state.Report.report,
  reportType: state.ReportType.reportType,
  application: state.Application.application,
  area: state.Area.area,
  areaid: state.Area.areaid,
  room: state.Room.room,
  roomid: state.Room.roomid,
  startDate: state.DateTime.startDate,
  endDate: state.DateTime.endDate,
  items: state.Data.items,
  tableColumn: state.Data.tableColumn,
  dataLoader: state.Data.loader
}))


const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(UserAlarmReports)
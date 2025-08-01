import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
// import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { ApplicationList } from "../../constants/ApplicationList"
// import { planList } from "../../constants/PlanList"
import { areaList } from "../../constants/AreaList"
import { areaEMSList } from "../../constants/AreaList"
import { roomList } from "../../constants/RoomList"
import { deviceList } from "../../constants/deviceList"
import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import saveAs from "file-saver";
import { emsRoomList } from "../../constants/EMSRoomList"
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import { TiExportOutline } from 'react-icons/ti'
import * as applicationActions from "../../redux/action/application";
import * as roomActions from "../../redux/action/room";
import * as areaActions from "../../redux/action/area";
import * as dateTimeActions from "../../redux/action/datetime";
import * as groupByActions from "../../redux/action/groupBy"
import * as resetActions from "../../redux/action/reset";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { createSearchParams, useSearchParams, useNavigate } from "react-router-dom";
import { getparams } from '../../redux/action/data'
//import { getUserDataReportData } from '../../redux/action/data'
import { getUserDataReportData } from '../../redux/action/data_clientCopy'
import { dispatchDataRequest } from '../../redux/action/data'
import { getUserDataReportData1 } from '../../redux/action/data'
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExportPdf from '../ExportPdf';
import GraphModal from '../GraphModal';
import { groupByList } from '../../constants/GroupBy';
import { temperingBase64 } from '../../constants/clientLogobase64';

const UserDataReports = ({ items,
  report, reportType, application,
  area,  room, dispatchUpdateDateTime,  startDate, endDate, groupByValue,  resetStore,  dataLoader }) => {

  // console.log("TREND items===================", items)
  const [searchparams, setSearchParams] = useSearchParams();
  const [dateValue, setDateValue] = useState()
  const [newRoomList, setNewRoomList] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSizeNew, setPageSizeNew] = useState()

  const defaultPageSize = [10, 50, 100, 500];


  function reset_PageNumber() {
    let pageN = document.getElementsByTagName("input")
    pageN[1].value = 1
  }

  let sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  function reset_PageSize() {
    setPageSizeNew(10)
    setPageNumber(1)
    sleep(4000).then(() => {
      reset_PageNumber()
    });
  }

  function rest_Store_Table() {
    resetStore()
    sleep(2000).then(() => {
      reset_PageNumber()
    });
  }

  // console.log("user-items-report====================", items)
  // console.log("dateValue", dateValue)

  function formatDateTime(date) {
  const pad = (num) => (num < 10 ? '0' + num : num);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


  // const getApp = searchparams.get("app");
  // const getRoom = searchparams.get("room");
  // const getArea = searchparams.get("area");
  // const getStartdate = searchparams.get("startDate");
  // const getEndDate = searchparams.get("endDate")

  // if (getApp && getRoom && getArea &&  getStartdate && getEndDate) {
  //   getparams(application, room, roomid, areaid, startDate, endDate)
  // }

  // console.log("queryparams", getApp, getRoom, getArea, getStartdate, getEndDate)

  // Navigation start
  let navigate = useNavigate();

  function handleNavigation() {
    navigate('/user/data-report');
  };

//   const newItems = []
// items && items.map((obj)=>{
//   // console.log('name is=======>>>>>',obj['FURNACE_TEMP.TEMPARING_ZONE_1.SP']['Value']);
//   let newObj = {SrNo:obj.SrNo,DateTime:obj.TS,"FURNACE_TEMP.TEMPARING_ZONE_1.SP":obj["FURNACE_TEMP.TEMPARING_ZONE_1.SP"], "FURNACE_TEMP.FURNACE_HEATING_ZONE_1.PV":obj[ "FURNACE_TEMP.TEMPARING_ZONE_1.PV"],
//   "FURNACE_TEMP.TEMPARING_ZONE_2.SP":obj["FURNACE_TEMP.TEMPARING_ZONE_2.SP"],"FURNACE_TEMP.TEMPARING_ZONE_2.PV":obj["FURNACE_TEMP.TEMPARING_ZONE_2.PV"],
//   "FURNACE_TEMP.TEMPARING_ZONE_3.SP":obj["FURNACE_TEMP.TEMPARING_ZONE_3.SP"],"FURNACE_TEMP.TEMPARING_ZONE_3.PV":obj["FURNACE_TEMP.TEMPARING_ZONE_3.PV"], 
//   "FURNACE_TEMP.TEMPARING_ZONE_4.SP":obj[ "FURNACE_TEMP.TEMPARING_ZONE_4.SP"],"FURNACE_TEMP.TEMPARING_ZONE_4.PV":obj["FURNACE_TEMP.TEMPARING_ZONE_4.PV"],
//   "FURNACE_TEMP.FURNACE_HEATING_ZONE_1.SP":obj["FURNACE_TEMP.FURNACE_HEATING_ZONE_1.SP"],"FURNACE_TEMP.FURNACE_HEATING_ZONE_1.PV":obj["FURNACE_TEMP.FURNACE_HEATING_ZONE_1.PV"],
//   "FURNACE_TEMP.FURNACE_HEATING_ZONE_2.SP":obj["FURNACE_TEMP.FURNACE_HEATING_ZONE_2.SP"],"FURNACE_TEMP.FURNACE_HEATING_ZONE_2.PV":obj["FURNACE_TEMP.FURNACE_HEATING_ZONE_2.PV"],
//   "RC FAN 3 CURRENT(Amp)":obj["RC FAN 3 CURRENT(Amp)"],"TEMP CONTROL VALUE3 OPEN %":obj["TEMP CONTROL VALUE3 OPEN %"]}
// newItems.push(newObj)
// })


// grouping items array according to ts
const grouped = {};
items.forEach(item => {
  const key = item.TS; // or `${item.TS}_${item.SrNo}` if needed for uniqueness
  if (!grouped[key]) {
    grouped[key] = {
      DateTime: item.TS,
    };
  }
  grouped[key][item.Name] = item.Value;
});

const newItems = Object.values(grouped)
  .sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));

newItems.forEach((item, index) => {
  item.SrNo = index + 1;
});

console.log("newItems-------::::", newItems);
// console.log('date is ======',date)

//   const excelExport = () => {
//     console.log("calling export")

//     let ExcelJSWorkbook = new ExcelJS.Workbook();
//     let worksheet = ExcelJSWorkbook.addWorksheet("TEMPERING");
//     worksheet.getRow(1).font = { bold: true };
//     // worksheet.getColumn(2).width = 34;
//     // first row start
//     worksheet.getRow(1).height = 60;
//     worksheet.getRow(1).width = 10;
//     const clientImg = ExcelJSWorkbook.addImage({
//       base64: temperingBase64,
//       extension: "png",
//     });
//     worksheet.getColumn(1).width = 18;
//     worksheet.addImage(clientImg, "A1:B1");
//     worksheet.mergeCells("C1:U1");
//     worksheet.getCell("C1").value = "DATA LOGGING FOR TEMPERING FURNACE"; // selected parameter
//     worksheet.getCell('C1').font = {
//       color: { argb: 'ccfdfbfc' }
//     }

//     worksheet.getCell("C1").alignment = {
//       vertical: "middle",
//       horizontal: "center",
//     };

//     worksheet.getCell("C1").fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc606462" },
//       font: { tabColor: { argb: 'ccfdfbfc' } }

//     };

//     // first row end
//     //second row start
//     // worksheet.addRow();
//     worksheet.mergeCells("A2:A3");
//     worksheet.getCell("A2").alignment = {
//       vertical: "middle",
//       horizontal: "center",
//     };
//     worksheet.getCell("A2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("A3").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };

//     worksheet.mergeCells("B2:B3");
//     worksheet.getCell("B2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("B3").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };

//     worksheet.getCell("C2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("D2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("E2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("F2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("G2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("H2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("I2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("J2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("K2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("L2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("M2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("M2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("N2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };

//     worksheet.getCell("O2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("P2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("Q2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("R2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("S2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("T2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getCell("U2").border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     worksheet.getRow(2).font = { bold: true };

//     worksheet.getCell('A2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "ccfde9d4" },
//     };

//     worksheet.getCell('B2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc21895e" },
//     };
//     worksheet.getCell('B2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("C2").value = "Z1 TEMP SP";
//     worksheet.mergeCells("C2:C3");
//     worksheet.getCell('C2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('C2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("D2").value = "Z1 TEMP PV";
//     worksheet.mergeCells("D2:D3");
//     worksheet.getCell('D2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('D2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("E2").value = "RC FAN 1 RPM";

//     worksheet.mergeCells("E2:E3");
//     worksheet.getCell('E2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('E2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("F2").value = "TEMP CONTROL VALUE 1 OPEN %";
//     worksheet.mergeCells("F2:F3");
//     worksheet.getCell('F2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('F2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("G2").value = "Z2 TEMP SP";
//     worksheet.mergeCells("G2:G3");
//     worksheet.getCell('G2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('G2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("H2").value = "Z2 TEMP PV";
//     worksheet.mergeCells("H2:H3");
//     worksheet.getCell('H2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('H2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("I2").value = "RC FAN 2 RPM";
//     worksheet.mergeCells("I2:I3");
//     worksheet.getCell('I2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('I2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("J2").value = "TEMP CONTROL VALUE 2 OPEN %";
//     worksheet.mergeCells("J2:J3");
//     worksheet.getCell('J2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('J2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("K2").value = "Z3 TEMP SP";
//     worksheet.mergeCells("K2:K3");
//     worksheet.getCell('K2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('K2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("L2").value = "Z3 TEMP PV";
//     worksheet.mergeCells("L2:L3");
//     worksheet.getCell('L2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('L2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("M2").value = "RC FAN 3 RPM";
//     worksheet.mergeCells("M2:M3");
//     worksheet.getCell('M2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('M2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     // worksheet.getCell("N2").value = "TEMP CONTROL VALUE 3 OPEN %";
//     worksheet.mergeCells("N2:N3");
//     worksheet.getCell('N2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('N2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     worksheet.mergeCells("O2:O3");
//     // worksheet.getCell("O2").value = "GAS FLOW METER";
//     worksheet.getCell('O2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('O2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     worksheet.mergeCells("P2:P3");
//     // worksheet.getCell("P2").value = "SLAT CONV RPM";
//     worksheet.getCell('P2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('P2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     worksheet.mergeCells("Q2:Q3");
//     // worksheet.getCell("Q2").value = "MATERIAL IN FURNACE";
//     worksheet.getCell('Q2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('Q2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     worksheet.mergeCells("R2:R3");
//     // worksheet.getCell("R2").value = "MATERIAL ENTRY TIME";
//     worksheet.getCell('R2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('R2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     worksheet.mergeCells("S2:S3");
//     // worksheet.getCell("S2").value = "MATERIAL EXIT TIME";
//     worksheet.getCell('S2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('S2').font = {
//       color: { argb: 'ccf9f609' }
//     }
//     worksheet.mergeCells("T2:T3");
//     worksheet.getCell('T2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('T2').font = {
//       color: { argb: 'ccf9f609' }
//     }

//     worksheet.mergeCells("U2:U3");
//     worksheet.getCell('U2').fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "cc273ff5" },
//     };
//     worksheet.getCell('U2').font = {
//       color: { argb: 'ccf9f609' }
//     }



  
//     worksheet.getRow(2).height = 23;



//     for (let i = 0; i < columns.length; i++) {
//       worksheet.getColumn(i + 2).width = 15;
//       let headerRow = worksheet.getRow(3);
//       let cell = headerRow.getCell(i + 1);
//       cell.value = Object.values(columns[i])[0];
//       cell.border = {
//         top: { style: 'thin' },
//         left: { style: 'thin' },
//         bottom: { style: 'thin' },
//         right: { style: 'thin' }
//       };
//       cell.alignment = { vertical: 'middle', horizontal: 'center' }
//     }

//     worksheet.properties.outlineProperties = {
//       summaryBelow: false,
//       summaryRight: false
//     };

//     // mapping each value with the given tags


// // console.log("newItems before looping -------------", newItems)
//     for (let i = 0; i < newItems.length ; i++) { // [{'key1':'value1', 'key2':'value2', 'key3':'value3'}, {}, {}]
//       let dataRow = worksheet.addRow();
//       newItems.map(e => {
//         console.log("newItems mapping=========", e)
//         if (!e.Name) {
//           if (newItems[i]) {
//             dataRow.outlineLevel = 1;
//           }
//         }
//       });
//       console.log("newItems after -------------", newItems)

//       for (let j = 0; j < Object.keys(newItems[i]).length; j++) { //
//         let cell = dataRow.getCell(j + 1);
//         let cellValue;
//         console.log(Object.values(newItems[i])[j])
//         if (j === 1) {
//           cellValue = new Date(Object.values(newItems[i])[j]).toLocaleString()
//         }
//         else {
//           cellValue = Object.values(newItems[i])[j]
//         }
//         //console.log("cellvalue::", cellValue, i , j)


//         cell.value = cellValue;
//         cell.border = {
//           top: { style: 'thin' },
//           left: { style: 'thin' },
//           bottom: { style: 'thin' },
//           right: { style: 'thin' }
//         };
//         cell.alignment = { vertical: 'middle', horizontal: 'center' }
//       }
//     }

//     ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
//       saveAs(
//         new Blob([buffer], { type: "application/octet-stream" }),
//         "Trend Report.xlsx"
//       );
//     });
//   }

const excelExport = async () => {

const startDateTime = formatDateTime(dateValue[0]);
const endDateTime = formatDateTime(dateValue[1]);
console.log('startDate is:',startDateTime)
console.log('endDate is:',endDateTime)
 
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Temperature Data');

  const zones = [
    'FURNACE_HEATING_ZONE_1',
    'FURNACE_HEATING_ZONE_2',
    'TEMPARING_ZONE_1',
    'TEMPARING_ZONE_2',
    'TEMPARING_ZONE_3',
    'TEMPARING_ZONE_4',
  ];

  const totalColumns = 1 + zones.length * 2;

  // === Insert Logo Image ===
  // const response = await fetch('/assets/logoTemp.jpeg');
  // const logoBuffer = await response.arrayBuffer();

  // const imageId = workbook.addImage({
  //   base64: temperingBase64,
  //   buffer: logoBuffer,
  //   extension: 'jpeg',
  // });
 const clientImg = workbook.addImage({
      base64: temperingBase64,
      extension: "jpeg",
    });
  worksheet.addImage(clientImg, {
    tl: { col: 0, row: 0 },
    ext: { width: 120, height: 120 },
  });
  // adding border to the box
  // Box borders from Row 1 to 3 and Column 1 (A) to 13 (M)
  // Step 1: Remove all borders from the 3x13 box
for (let row = 1; row <= 3; row++) {
  for (let col = 2; col <= 13; col++) {
    const cell = worksheet.getRow(row).getCell(col);

    // Set white background to hide gridlines
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' },
    };

    // Set only outer border
    const border = {};
    if (row === 1) border.top = { style: 'medium' };
    if (row === 3) border.bottom = { style: 'medium' };
    if (row === 1) border.bottom = { style: 'medium' };
    if (col === 1) border.left = { style: 'medium' };
    if (col === 1) border.right = { style: 'medium' };
    if (col === 13) border.right = { style: 'medium' };
    cell.border = border;
  }
}



  // === Adjust column widths ===
  worksheet.getColumn(1).width = 18; // Date Time
  zones.forEach((zone, i) => {
    const colIndex = i * 2 + 2;
    worksheet.getColumn(colIndex).width = 10;     // SP
    worksheet.getColumn(colIndex + 1).width = 10; // PV
  });

  // === Title Row (Row 1) ===
  worksheet.mergeCells(`C1:${worksheet.getColumn(totalColumns).letter}1`);
  const titleCell = worksheet.getCell('C1');
  titleCell.value = 'HEATING & TEMPRING TEMPERATURE DATA REPORT';
  titleCell.font = { size: 20, bold: true };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(1).height = 50;

  // === Add spacing row (Row 2) ===
  worksheet.getRow(2).height = 30;

  // === Row 3: Metadata ===
  // === Row 3: Metadata in one row with spacing cells ===
const metaRow = worksheet.getRow(2);

metaRow.getCell(2).value = 'Start Date & Time:';
metaRow.getCell(2).font = { bold: true };


metaRow.getCell(6).value = 'End Date & Time:';
metaRow.getCell(6).font = { bold: true };

metaRow.getCell(10).value = 'Signature:-';
metaRow.getCell(10).font = { bold: true };

metaRow.getCell(4).value = startDateTime;
metaRow.getCell(8).value = endDateTime;

// Optionally increase row height for handwriting
metaRow.height = 30;


  // === Header Rows (Row 5, 6, 7) ===

  // Merge "Date Time" over 3 rows
  worksheet.mergeCells('A5:A7');
  const dateTimeCell = worksheet.getCell('A5');
  dateTimeCell.value = 'Date Time';
  dateTimeCell.alignment = { vertical: 'middle', horizontal: 'center' };
  dateTimeCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  dateTimeCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0070C0' },
  };
  dateTimeCell.border = {
    top: { style: 'medium' },
    left: { style: 'medium' },
    bottom: { style: 'medium' },
    right: { style: 'medium' },
  };

  // Zone headers
  zones.forEach((zone, i) => {
    const colIndex = i * 2 + 2;
    const col1 = worksheet.getColumn(colIndex).letter;
    const col2 = worksheet.getColumn(colIndex + 1).letter;

    // Merge Zone Title across 2 columns and 2 rows
    worksheet.mergeCells(`${col1}5:${col2}6`);
    const zoneTitleCell = worksheet.getCell(`${col1}5`);
    zoneTitleCell.value = zone;
    zoneTitleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    zoneTitleCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    zoneTitleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0070C0' },
    };
    zoneTitleCell.border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' },
    };

    // SP and PV Headers on row 7
    const spCell = worksheet.getCell(`${col1}7`);
    spCell.value = 'SP°C';
    spCell.alignment = { horizontal: 'center' };
    spCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    spCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00B0F0' },
    };
    spCell.border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' },
    };

    const pvCell = worksheet.getCell(`${col2}7`);
    pvCell.value = 'PV°C';
    pvCell.alignment = { horizontal: 'center' };
    pvCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    pvCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF00B0F0' },
    };
    pvCell.border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' },
    };
  });

  // === Data Rows Start from Row 8 ===
  const formatDate = (date) =>
    new Date(date).toISOString().replace('T', ' ').substring(0, 19);

  newItems.forEach((entry) => {
    const row = [];
    row.push(entry.DateTime);

    zones.forEach((zone) => {
      const spKey = `FURNACE_TEMP.${zone}.SP`;
      const pvKey = `FURNACE_TEMP.${zone}.PV`;

      const spValue = entry[spKey] ?? '';
      let pvValue = entry[pvKey] ?? '';

      if (typeof pvValue === 'number') {
        pvValue = Number(pvValue.toFixed(3));
      }

      row.push(spValue, pvValue);
    });

    const newRow = worksheet.addRow(row);

    // Apply medium border to each cell in the row
    newRow.eachCell((cell) => {
      cell.border = {
        top: { style: 'medium' },
        left: { style: 'medium' },
        bottom: { style: 'medium' },
        right: { style: 'medium' },
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // Save the workbook
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, 'Temperature_Report.xlsx');
};





  // Navigation end

  let isDisabledRoom = true;
  let isDisabledArea = true;
  let isDisbaledDate = true;
  let isDisbaledgroupBy = true;
  let isDisbaledProceed = true;

  //area dropdown disable enable
  if (application) {
    isDisabledArea = false
  }
  //area dropdown disable enable

  // room dropdown disable enable
  if (area) {
    isDisabledRoom = false
  }
  // roomlist dropdown disable enable

  // daterange diasble enable
  if (room) {
    isDisbaledDate = false
  }
  // daterange diasble enable

  // groupby disable enable start
  if (startDate && endDate) {
    isDisbaledgroupBy = false
  }
  // groupby disable enable end

  // Proceed diasble enable
  if (startDate && endDate) {
    isDisbaledProceed = false
  }
  //Proceed diasble enable

function convertUTCToIST(dateTimeStr) {
  const date = new Date(dateTimeStr); // Parse UTC date string
  // IST is UTC + 5:30 => 330 minutes
  const istOffset = 330 * 60 * 1000;
  const istDate = new Date(date.getTime() + istOffset);

  const pad = (num) => (num < 10 ? '0' + num : num);

  const year = istDate.getFullYear();
  const month = pad(istDate.getMonth() + 1);
  const day = pad(istDate.getDate());
  const hours = pad(istDate.getHours());
  const minutes = pad(istDate.getMinutes());
  const seconds = pad(istDate.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  // react table columns start
const columns = [
  { Header: "SrNo", accessor: "SrNo" },
  { Header: "DateTime",
    id: "DateTime",  
    // accessor: row => row.DateTime.replace("T", " ").replace("Z", ""), },
    accessor: row => row.DateTime,},
  {
    Header: "HF-HEATING-ZONE-1",
    columns: [
      {
        id: "FURNACE_TEMP.FURNACE_HEATING_ZONE_1.SP",
        Header: "SP°C",
        accessor: row => row["FURNACE_TEMP.FURNACE_HEATING_ZONE_1.SP"] ?? "-",
      },
      {
        id: "FURNACE_TEMP.FURNACE_HEATING_ZONE_1.PV",
        Header: "PV°C",
        accessor: row =>
          row["FURNACE_TEMP.FURNACE_HEATING_ZONE_1.PV"] != null
            ? parseFloat(row["FURNACE_TEMP.FURNACE_HEATING_ZONE_1.PV"]).toFixed(3)
            : "-",
      },
    ],
  },
  {
    Header: "HF-HEATING-ZONE-2",
    columns: [
      {
        id: "FURNACE_TEMP.FURNACE_HEATING_ZONE_2.SP",
        Header: "SP°C",
        accessor: row => row["FURNACE_TEMP.FURNACE_HEATING_ZONE_2.SP"] ?? "-",
      },
      {
        id: "FURNACE_TEMP.FURNACE_HEATING_ZONE_2.PV",
        Header: "PV°C",
        accessor: row =>
          row["FURNACE_TEMP.FURNACE_HEATING_ZONE_2.PV"] != null
            ? parseFloat(row["FURNACE_TEMP.FURNACE_HEATING_ZONE_2.PV"]).toFixed(3)
            : "-",
      },
    ],
  },
  {
    Header: "TF-HEATING-ZONE-1",
    columns: [
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_1.SP",
        Header: "SP°C",
        accessor: row => row["FURNACE_TEMP.TEMPARING_ZONE_1.SP"] ?? "-",
      },
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_1.PV",
        Header: "PV°C",
        accessor: row =>
          row["FURNACE_TEMP.TEMPARING_ZONE_1.PV"] != null
            ? parseFloat(row["FURNACE_TEMP.TEMPARING_ZONE_1.PV"]).toFixed(3)
            : "-",
      },
    ],
  },
  {
    Header: "TF-HEATING-ZONE-2",
    columns: [
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_2.SP",
        Header: "SP°C",
        accessor: row => row["FURNACE_TEMP.TEMPARING_ZONE_2.SP"] ?? "-",
      },
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_2.PV",
        Header: "PV°C",
        accessor: row =>
          row["FURNACE_TEMP.TEMPARING_ZONE_2.PV"] != null
            ? parseFloat(row["FURNACE_TEMP.TEMPARING_ZONE_2.PV"]).toFixed(3)
            : "-",
      },
    ],
  },
  {
    Header: "TF-HEATING-ZONE-3",
    columns: [
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_3.SP",
        Header: "SP°C",
        accessor: row => row["FURNACE_TEMP.TEMPARING_ZONE_3.SP"] ?? "-",
      },
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_3.PV",
        Header: "PV°C",
        accessor: row =>
          row["FURNACE_TEMP.TEMPARING_ZONE_3.PV"] != null
            ? parseFloat(row["FURNACE_TEMP.TEMPARING_ZONE_3.PV"]).toFixed(3)
            : "-",
      },
    ],
  },
  {
    Header: "TF-HEATING-ZONE-4",
    columns: [
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_4.SP",
        Header: "SP°C",
        accessor: row => row["FURNACE_TEMP.TEMPARING_ZONE_4.SP"] ?? "-",
      },
      {
        id: "FURNACE_TEMP.TEMPARING_ZONE_4.PV",
        Header: "PV°C",
        accessor: row =>
          row["FURNACE_TEMP.TEMPARING_ZONE_4.PV"] != null
            ? parseFloat(row["FURNACE_TEMP.TEMPARING_ZONE_4.PV"]).toFixed(3)
            : "-",
      },
    ],
  },
];


// console.log('checking rows is======>>>>>>',newItems[0]); // sample row
// console.log('chekcing column mapping is======>>>>>',columns.map(col => col.accessor || (col.columns?.map(sub => sub.accessor))));

  // const columns = tableColumn && tableColumn.map((item) => {
  //   return (
  //     { Header: item, accessor: item }
  //   )
  // })


  // date range picker value 
  const getDateValue = (date) => {
    setDateValue(date)
  }

  return (
    <div className='user-report'>
      {/* <code> &nbsp; {report} -&gt; {reportType}</code> */}
      <div className='data-filter-panel'>
        <div className='first-row'>

          {/* Date Range Filter strat*/}
          <DateRangePicker
            format="yyyy-MM-dd HH:mm:ss"
            className='date-range'
            placeholder="Select Date Range"
            placement='bottomEnd'
            cleanable={false}
            value={dateValue && dateValue}
            //disabled={isDisbaledDate}
            onChange={(date) => {
              dispatchUpdateDateTime(date[0], date[1]);
              setSearchParams(prev => ([...prev.entries(), ['startDate', date[0]], ['endDate', date[1]]]));
              getDateValue(date);
            }}
          />
          {/* Date Range Filter end*/}

          
          {/* GroupBy Filter Start */}
          {/* <select
            className='option-select-dropdown'
            disabled={ isDisbaledgroupBy}
          value={groupBylabel} // ...force the select's value to match the state variable...
          onChange={e => {
            groupByList && groupByList.map((item, index) => {
              if (e.target.value == item.label) {
                dispatchUpdateGroupBy(item.value,item.label);
                setSearchParams(prev => ([...prev.entries(), ['groupby', (item.label)]]));
              }
            })
          }} // ... and update the state variable on any change!
          >
            <option hidden>Select GroupBy</option>
            {
              groupByList && groupByList.map((item, index) => (
                <option key={index} value={item.label} >{item.label}</option>
              ))
            }
          </select> */}

          {/* groupBy Filter End */}

        </div>

        <div className='second-row'>


          {/* Proceed to api call start*/}
          <Button
            variant='white'
            className='reset-btn'
            disabled={isDisbaledProceed}
            onClick={() => { getUserDataReportData1(startDate, endDate); reset_PageSize(); dispatchDataRequest() }}
          >
            Proceed
          </Button>
          {/* Proceed to api call end*/}

          {/* reset button start */}
          <Button
            variant='white'
            className='reset-btn'
            onClick={() => { rest_Store_Table(); handleNavigation(); setDateValue([]) }}
          >
            Reset
          </Button>
          {/* reset button end */}
        </div>
      </div>

      <div className='data-report-table'>
        <div className='table-title'>
          <div style={{ fontSize: "calc(1.6vw)" }}>Data Report</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            {/* {application === "LAF ANNUNCIATOR SYSTEM" ? <GraphModal /> : ""} */}
            <div style={{ backgroundColor: "white", width: "3vw", height: "5vh", display: "flex", alignItems: "center" }}>
              <TiExportOutline onClick={excelExport} style={{ fontSize: "1.4vw", color: "white", backgroundColor: "dodgerblue", width: "3vw", height: "5vh", borderRadius: ".3vw", cursor: "pointer" }} />
              {/* <div class="loader"></div>           */}
            </div>
            {/* <button className='export'
            onClick={excelExport}>export</button> */}
          </div>

        </div>

        <ReactTable
          data={newItems}
          columns={columns}
          loading={dataLoader}
          defaultPageSize={10}
          pageSizeOptions={defaultPageSize}
          onPageSizeChange={(number) => setPageSizeNew(number)}
          pageSize={pageSizeNew}
          onPageChange={(number) => setPageNumber(number + 1)}
          page={pageNumber - 1}
          style={{ textAlign: "center", height: "90%", fontSize: "1vw" }}
        // showPagination={false} 
        // defaultPageSize={5}
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
  dispatchUpdateGroupBy: state.GroupBy.dispatchUpdateGroupBy
}),
  { ...applicationActions, ...roomActions, ...areaActions, ...dateTimeActions, ...resetActions, ...groupByActions })

const mapStateToProps = (state => ({
  report: state.Report.report,
  reportType: state.ReportType.reportType,
  application: state.Application.application,
  area: state.Area.area,
  areaid: state.Area.areaid,
  room: state.Room.room,
  roomid: state.Room.roomid,
  roomRange: state.Room.range,
  startDate: state.DateTime.startDate,
  endDate: state.DateTime.endDate,
  groupBylabel: state.GroupBy.groupBylabel,
  groupByValue: state.GroupBy.groupByValue,
  items: state.Data.items,
  tableColumn: state.Data.tableColumn,
  dataLoader: state.Data.loader
}))


const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default (withConnect)(UserDataReports)

// const getData = HOC(((withConnect)(UserDataReports)))
// // const getData = HOC(((withConnect)(UserDataReports)), "LAF", 10, 2, "2023/2/28 10:42:00", "2023/2/28 23:59:59")
// // const getData = HOC(((withConnect)(UserDataReports)), getApp, getRoom, getArea, getStartdate, getEndDate)

// export default getData;
import React, { useState } from 'react'
import ReactTable from "react-table";
import { MultiSelect } from "react-multi-select-component";
import 'react-table/react-table.css';
import { columns1 } from '../constants/reportColumns/paramsReport';
// import { reset } from "../Action/common";
import ExcelJS from "exceljs/dist/es5/exceljs.browser";
import saveAs from "file-saver";
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css"
import "../styles/all/home.scss";
import useWindowDimensions from '../component/Responsive';
import { connect } from 'react-redux';
import {dropDownListParams ,dropDownMachinesListPM} from '../constants/dropDownListParamsPM'
import axios from 'axios'
import { reset } from "../Action/common";
import store from "../config/store"


const Home = ({startDate, endDate,reportItems, updateparametersReport})=> {

  const [pageSizeNew, setPageSizeNew] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const { height, width } = useWindowDimensions();
  const defaultPageSize = [20, 50, 100, 500];

  const [paramselected, setParamSelected] = useState([]);
  const [machineselected, setMachineSelected] = useState ([]);

  reportItems.map((item, index) => {
    item.Sr = index + 1
  })

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

    sleep(2000).then(() => {
      reset_PageNumber()
    });
  }


  const columns = [
    {
      Header: 'DATE & TIME ',
      accessor: 'timeat',
    },
    {
      Header: 'MINIMUM',
      accessor: 'minimum'
    },
    {
      Header: 'MAXIMUM',
      accessor: 'maximum',
    },
    {
      Header: 'ACTUAL',
      accessor: 'actual',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
    }
  ]


  const excelExport = () => {
    console.log("calling export")

     let items1 = []
    reportItems.map((i, index) => {
      let No = index + 1
      items1.push(
        {
          timeat: i.timeat,
          minimum: i.minimum,
          maximum: i.maximum,
          actual: i.actual,
          status: i.status,
         
        }
      )
    })

    var ExcelJSWorkbook = new ExcelJS.Workbook();
    var worksheet = ExcelJSWorkbook.addWorksheet("DOC Station");
    var len = columns1.length
    var headerRow = worksheet.addRow();
    worksheet.getRow(1).font = { bold: true };
    // worksheet.getColumn(2).width = 34;

    for (let i = 0; i < len; i++) {
      worksheet.getColumn(i + 2).width = 15;
      let cell = headerRow.getCell(i + 1);
      cell.value = Object.values(columns1[i])[0];
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
    }

    worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false
    };

    for (let i = 0; i < items1.length; i++) { // [{'key1':'value1', 'key2':'value2', 'key3':'value3'}, {}, {}]
      var dataRow = worksheet.addRow();
      if (items1[i]) {
        dataRow.outlineLevel = 1;
      }
      for (let j = 0; j < Object.keys(items1[i]).length; j++) { //
        let cell = dataRow.getCell(j + 1);

        if (j == 1) {
          var cellValue = new Date(Object.values(items1[i])[j]).toLocaleString()
        }
        else {
          var cellValue = Object.values(items1[i])[j]
        }
        //console.log("cellvalue::", cellValue, i , j)


        cell.value = cellValue;
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      }
    }

    ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "Parameters Report.xlsx"
      );
    });
  
  }
  const getParametersReports = async (startDate, endDate) => {

    // await sleep(1000)
    console.log(`axios::  startdate:${startDate}, endDate:${endDate}`)

    const res = axios.get
    ( `http://localhost:3000/api/param?startDate=133367200771520000&endDate=133367202163680000`)
      .then((res) => {
        console.log("Getting DATA", res.data);
        updateparametersReport(res.data)
        console.log("set data successfully...")
      })

      .catch(function (error) {
        console.log("error", error.toJSON());
      })
  
}


  return (
    <div className='main-container'>
      <div className='filterpanel'>
        <div className='select-params'>
          {/* <input type='text'></input> */}
          <MultiSelect
              disablePreSelectedValues
              options={dropDownMachinesListPM}
              value={paramselected}
              onChange={setParamSelected}
            />
        </div>
        <div className='select-params'>
        <MultiSelect
              disablePreSelectedValues
              options={dropDownListParams}
              value={machineselected}
              onChange={setMachineSelected}
            />       
        </div>
        <div className='startDate'>
          <DateRangePicker oneTap showOneCalendar
            placeholder="Start Date"
          />
        </div>
        <div className='endDate'>
          <DateRangePicker oneTap showOneCalendar
            placeholder="End Date"
          />
        </div>
          <button type="" className="reset" onClick={() => { reset_PageSize(); getParametersReports(startDate, endDate) }} >  Proceed </button>
        <button type="" className="reset" onClick={() => store.dispatch(reset())} > Reset</button>
      </div>

      <div className='report-body'>
        <div className='table-header'>
          <span className='heading'>Parameter Reports</span>
          <button className='export' onClick={excelExport}>export</button>
       
        </div>
        <div className='table-view'>
          <ReactTable
            columns={columns1}
            data={reportItems}
            defaultPageSize={20}
            pageSizeOptions={defaultPageSize}
            onPageSizeChange={(number) => setPageSizeNew(number)}
            pageSize={pageSizeNew}
            onPageChange={(number) => setPageNumber(number + 1)}
            page={pageNumber - 1}
            style={{ textAlign: "center", height: "100%", fontSize: "1vw" }}
          />
        </div>
      </div>
    </div>
  );
}
const withConnect = connect(
  state => ({
    startDate: state.dateFilter.startDate,
    endDate: state.dateFilter.endDate,
    reportItems: state.reportdata.reportItems
  }),
  {}
);

export default (withConnect)(Home);

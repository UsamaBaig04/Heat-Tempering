import { DATA_UPDATED,DATA_REQUEST_ERROR, DATA_REQUEST } from '../constants/report'
import { store } from "../store/store";
import { bindActionCreators } from "redux";
import axios from 'axios'
import _ from 'underscore';



const dataRequest = ()=>{
    return({
        type:DATA_REQUEST
    })
}
const dataRequestError = ()=>{
    return({
        type:DATA_REQUEST_ERROR
    })
}

const getTableData = (data, columnTable) => {
    return ({
        type: DATA_UPDATED,
        data,
        columnTable
    })
}


export const dispatchUpdateData = bindActionCreators(getTableData, store.dispatch)
export const dispatchDataRequest = bindActionCreators(dataRequest, store.dispatch)
export const dispatchDataRequestError = bindActionCreators(dataRequestError, store.dispatch)





export const getUserDataReportData1 = async ( startDate, endDate, groupByValue) => {
    // await sleep(1000)
    //console.log("axios:::::::::::::::::::", startDate, endDate)

    const res = axios.get(
        // "https://jsonplaceholder.typicode.com/users"
        // `http://localhost:3000/api/user/dataReport?startDate=${startDate}&endDate=${endDate}`
        //  `http://192.168.0.240:3000/api/datareport?startDate=${startDate}&endDate=${endDate}`
         `http://localhost:3000/api/datareport?startDate=${startDate}&endDate=${endDate}`
    )
        .then((res) => {
            const finalData=[]
            res.data.map((items, index) => {
                const item = Object.assign({SrNo: index+1}, items);
                if(index+1!=res.data.length){
                    finalData.push(item)
                }
              })
            console.log("Getting AXIOS TREND DATA:::", res.data);
            var columnData = ["SrNo"]
            const lastObj = res.data[res.data.length-1]
            console.log("lastObj:::::::", lastObj)

            if (lastObj && Array.isArray(lastObj.Name)) {
                lastObj.Name.forEach((itm) => {
        columnData.push(itm);
    });
} else {
    console.warn("lastObj or lastObj.Description is not in expected format:", lastObj);
}

            // lastObj[0].Description.map((itm, index) => {
            //     console.log("items:::::::", itm)

            //     return columnData.push(itm)
            // })
            console.log("Modified Trend column::", columnData)

            dispatchUpdateData(finalData, columnData)
            console.log("set data successfully...")
        })
        .catch((err)=>{
            console.log("ERROR Caught",err)
            dispatchDataRequestError()

        })
}


export const getUserAlarmReportData = async (application, areaid, roomid, startDate, endDate) => {
    // await sleep(1000)
    console.log("axios", application, areaid, roomid, startDate, endDate)

    const res = axios.get(
        // "https://jsonplaceholder.typicode.com/users"
        //`http://192.168.0.207:3000/api/user/alarmReport?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}`
        `http://192.168.0.154:3000/api/user/alarmReport?startDate=${startDate}&endDate=${endDate}`
    )
        .then((res) => {
            console.log("Getting ALARM DATA::::", res.data);
            
            dispatchUpdateData(res.data, [])
            console.log("set data successfully...")
        })
        .catch((err)=>{
            console.log("ERROR Caught",err)
            dispatchDataRequestError()

        })
}
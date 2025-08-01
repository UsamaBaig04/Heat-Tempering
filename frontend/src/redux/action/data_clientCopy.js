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



axios.interceptors.request.use(request => {  
    console.log('Starting Request', JSON.stringify(request, null, 2))  
    return request
})



export const getUserDataReportData = async (application, areaid, room, roomid,roomRange, startDate, endDate, groupByValue) => {

    // await sleep(1000)
    console.log(`before axios calling ------ ${application}:::${areaid}:::${roomid}:::${roomRange}:::${startDate}:::${endDate}:::${groupByValue}`)
    groupByValue == '' ? groupByValue = 'default':groupByValue = groupByValue
    const grouBy = `&groupBy=${groupByValue}`
    const res = axios.get(
        //`http://192.168.0.202:3002/api/user/dataReport?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}&room=${roomid}`
        //`http://192.168.0.202:3002/api/user/dataReport?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}&${roomid.map((n, index) => `room[${index}]=${n}`).join('&')}`
        `http://192.168.0.202:3002/api/user/dataReport?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}&${Array.isArray(roomid) ? roomid.map((n, index) => `room[${index}]=${n}`).join('&') : `room=${roomid}`}${groupByValue != 'default' ? grouBy:''}`
    )
        .then((res) => {
            console.log("Getting DATA", res.data);
            console.log("dataLength", (res.data).length)
            if ((res.data).length > 1) {

                // react table column 
                var columnData = ["Date Time"]
                const lastObj = res.data[res.data.length-1] // get last object of data in which description, min, max values store


                lastObj.Description.map((itm, index) => {
                    if (itm != "Date Time") {
                        if((application && application) == "LAF ANNUNCIATOR SYSTEM") {
                            let newItm = itm.replaceAll('.', '_')
                            //itm = itm.replace(itm, `${newItm}`)
                            itm = itm.replace(itm, `${room} ${newItm}`)
                            return columnData.push(itm)
                        }else if((application && application) == "BMS"){
                            let newItm = itm.replaceAll('.', '_')
                            itm = itm.replace(itm, `${newItm}`)
                            console.log('itm::', itm)
                            //itm = itm.replace(itm, `${room} ${newItm}`)
                            return columnData.push(itm)
                        }
                        else if((application && application) == "EMS"){
                            let newItm = itm.replaceAll('.', '_')
                            itm = itm.replace(itm, `${newItm}`)
                            itm = itm.replace(itm, `${newItm}`)
                            return columnData.push(itm)                            
                        }
                    }
                })
                // react table column 


                // react Table data
                var newData = [];

                const rangeObj = Object.fromEntries(
                    Object.entries(res.data[0]).map(([key, value]) =>{
                        if ((application && application) == "LAF ANNUNCIATOR SYSTEM") {
                            // Modify key here
                            console.log(`LAF room = ${room}, key = ${key}`)
                            // if(key == "Date Time") return [key, "Range/Unit"]
                            // else if(key == "PDN/VLAF/813" || "PDN/VLAF/897" || "PDN/VLAF/898" || "PDN/VLAF/899" || "PDN/VLAF/900" || "PDN/VLAF/901" || "PDN/VLAF/902") return [`${room} ${key}`, "150-300/Pa"]
                            // else if(key == "W/INJ/LAF/02" || "W/INJ/LAF/03" || "W/INJ/LAF/05" || "W/INJ/LAF/49" || "W/INJ/LAF/13" || "W/INJ/LAF/20") return [`${room} ${key}`, "100-180/Pa"]
                            // else if(key == 'PDN/VLAF/442') return [`${room} ${key}`, "100-200/Pa"]
                            // else if(key == 'PDN/VLAF/893' || "PDN/VLAF/889" || 'PDN/VLAF/894') return [`${room} ${key}`, "200-300/Pa"]
                            
                            return(                              
                                key == "Date Time" ? [key, "Range/Unit"] :[`${room} ${key}`, roomRange]
                                // key == "PDN/VLAF/813" || "PDN/VLAF/897" || "PDN/VLAF/898" || "PDN/VLAF/899" || "PDN/VLAF/900" || "PDN/VLAF/901" || "PDN/VLAF/902" ? [`${room} ${key}`, "150-300/Pa"] :
                                // room == "INJECTABLE UNIT PREPARATION" || "INJECTABLE WASHING AREA" || "STORAGE LAF 3" || "SVP FILTRATION 2" ? [`${room} ${key}`, "100-180/Pa"] : 
                                // room == 'LINEN PREPARATION & STORAGE' ? [`${room} ${key}`, "100-200/Pa"] : 
                                // room == 'SVP FILTRATION 1' || "STORAGE LAF 1" || 'STORAGE LAF 2' ? [`${room} ${key}`, "200-300/Pa"] : 
                                // [`${room} ${key}`, "100-150/Pa"]
                            )
                        } else if ((application && application) == "BMS") {
                            // Modify key here
                            return(
                                key == "Date Time" ? [key, "Range/Unit"] : key == "AHU MODE" ? [`${key}`, "AUTO/MANUAL"]:
                                key == "AHU MODE" ? [`${key}`, "AUTO/MANUAL"]:
                                key == "SPEED_FB" ? [`${key}`, "Hz"]:
                                key == "BLOWER DP" ?  [`${key}`, "Kpa"]:
                                key == "G4 FILTER DP" ? [`${key}`, "50-400 Pa"]:
                                key == "F7 FILTER DP" ? [`${key}`, "50-400 Pa"]:
                                key == "F9 FILTER DP" ? [`${key}`, "110-450 Pa"]:
                                key == "MIX AIR TEMP" ? [`${key}`, `°C`]:
                                key == "SA TEMP" ? [`${key}`, `°C`]:
                                key == "RA TEMP" ? [`${key}`, "NMT 27"+`°C`]:
                                key == "RA RH" ? [`${key}`, "NMT 75%"]:
                                key == "CHW IN TEMP" ? [`${key}`, "NMT 10"+`°C`]:
                                key == "CHW OUT TEMP" ? [`${key}`, `°C`]:
                                key == "HW IN TEMP" ? [`${key}`, "°NLT 40"+`°C`]:
                                key == "HW OUT TEMP" ? [`${key}`,`°C`]:
                                [`${key}`, ""]
                            )
                        } else if ((application && application) == "EMS") {
                            // Modify key here
                            return(
                                key == "Date Time" ? [key, "Range/Unit"] : [`${room} ${key}`, "100-180/Pa"]
                            )                            
                        }
                    }
                        // Modify key here
                    )
                )
                newData.push(rangeObj)

                res.data.map((itm, index) => {
                    const altObj = Object.fromEntries(
                        Object.entries(itm).map(([key, value]) => {
                            if (application == "LAF ANNUNCIATOR SYSTEM") {
                                // Modify key here
                                return(
                                    key == "Date Time" || key == "Description" ? [key, value] : [`${room} ${key.replaceAll('.', '_')}`, value]
                                )
                            } else if (application == "BMS") {
                                // Modify key here
                                return(
                                    key == "Date Time" || key == "Description" ? [key, value] : [`${key.replaceAll('.', '_')}`, value]
                                )
                            } else if (application == "EMS") {
                                // Modify key here
                                return(
                                    key == "Date Time" || key == "Description" ? [key, value] : [`${key.replaceAll('.', '_')}`, value]
                                )                                
                            }
                        }
                            //   [`${roomN} ${key}`, value]
                        )
                    )
                    // console.log("altObj", altObj)
                    newData.push(altObj)
                    // console.log("newData, altObj", newData )
                })

                const minMaxObj = res.data[res.data.length-1] // get last object of data in which min max values store

                const obj1 = {};
                const minmaxColumn = []
                columnData.map((itm) => {
                    if(itm != "Date Time") {
                        minmaxColumn.push(itm)
                    }
                })
                minmaxColumn.forEach((element, index) => {
                    obj1[element] = (minMaxObj.minVal)[index];
                });
                
                const minValueObj = Object.fromEntries(
                    Object.entries(res.data[0]).map(([key, value]) => {
                        // Modify key here
                        if (application == "LAF ANNUNCIATOR SYSTEM") {
                            return key == "Date Time" ? [key, "Min"] : [`${room} ${key}`, ""]
                        } else if (application == "BMS") {
                            return key == "Date Time" ? [key, "Min"] : [`${key}`, ""]
                        } else if (application == "EMS") {
                            return key == "Date Time" ? [key, "Min"] : [`${key}`, ""]
                        }
                    }
                    )
                )
                const minValuesObj = {
                    ...minValueObj,
                    ...obj1
                }
                newData.push(minValuesObj)

                const obj2 = {};
                minmaxColumn.forEach((element, index) => {
                    obj2[element] = (minMaxObj.maxVal)[index];
                });
                const maxValueObj = Object.fromEntries(
                    Object.entries(res.data[0]).map(([key, value]) => {
                        if (application == "LAF ANNUNCIATOR SYSTEM") {
                            return key == "Date Time" ? [key, "Max"] : [`${room} ${key}`, ""]
                        } else if (application == "BMS") {
                            return key == "Date Time" ? [key, "Max"] : [`${key}`, ""]
                        } else if (application == "EMS") {
                            return key == "Date Time" ? [key, "Max"] : [`${key}`, ""]
                        }
                    }
                        // Modify key here
                        // key == "DateTime" ? [key, "Max"] : [`${room} ${key}`, ""]
                    )
                )
                const maxValuesObj ={
                    ...maxValueObj,
                    ...obj2
                }
                newData.push(maxValuesObj)
                // react Table data
            }
            else {
                columnData = []
                newData = []
            }

            columnData.map((itm) => {
                itm.replaceAll('.', '_')
            })
            console.log("Modified Data", newData)
            console.log("Modified column", columnData)
            dispatchUpdateData(newData, columnData)
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
        `http://192.168.0.202:3002/api/user/alarmReport?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}`
        // "http://192.168.0.155:3002/api/user?app=LAF&startDate=2023/2/28 10:42:00&endDate=2023/2/28 23:59:59&area=2&room=10"
    )
        .then((res) => {
            console.log("Getting DATA", res.data);

            // react table column 
            const columnData = []
            res.data.map((itm, index) => {
                // let position = itm.room.search('DP HIGH');
                let newRoomName = itm.room.replace('DP', '').replace('High', '').replace('Low', '').replace('Room', ' ')
                itm.room = newRoomName
                //itm.message.includes('DP High') ? itm.message = "DP High": itm.message.includes('DP Low') ? itm.message = "DP Low": itm.message.includes('DP HIGH') ? itm.message = "DP HIGH" : itm.message=itm.message;
                _.isNull(itm.user) ? itm.user = '' : itm.user = itm.user
            })
            dispatchUpdateData(res.data, columnData)
            console.log("set data successfully...")
        })
}

export const getUserAuditReportData = async (application, areaid, roomid, startDate, endDate) => {

    // await sleep(1000)
    console.log("axios", application, areaid, roomid, startDate, endDate)

    const res = axios.get(
        // "https://jsonplaceholder.typicode.com/users"
        `http://192.168.0.202:3002/api/user/auditReport?app=${application}&startDate=${startDate}&endDate=${endDate}&area=${areaid}&room=${roomid}`
        // "http://192.168.0.155:3002/api/user?app=LAF&startDate=2023/2/28 10:42:00&endDate=2023/2/28 23:59:59&area=2&room=10"
    )
        .then((res) => {
            console.log("Getting DATA", res.data);

            // react table column
            const columnData = []

            // res.data.map((itm, index) => {
            //     let position = itm.room.search('DP HIGH');
            //     let newRoomName = itm.room.replace('DP', '').replace('High','').replace('Low','').replace('Room',' ')
            //     itm.room = newRoomName
            //     itm.message.includes('DP High')? itm.message = "DP High": itm.message.includes('DP Low')? itm.message = "DP Low": itm.message=itm.message;
            //     _.isNull(itm.user)? itm.user = '': itm.user = itm.user
            // })

            dispatchUpdateData(res.data, columnData)
            console.log("set data successfully...")

        })
}
    // apiCall()





            // res.data.map((item)=>{
            //     item[`${roomN} ${item.Description}`] = item.Value

            //     if(columnData.includes(`${roomN} ${item.Description}`) != true){
            //         columnData.push(`${roomN} ${item.Description}`)
            //     }

            // })

            // const groupedTS = groupBy(res.data, 'TS');
            // // console.log('groupedTS', groupedTS);
            // Object.values(groupedTS).map((items)=>{
            //     const allItem = Object.assign({}, ...items);
            //     // console.log(allItem)
            //     newData.push(allItem)
            // })


    // function groupBy(objectArray, property) {
    //     return objectArray.reduce((acc, obj) => {
    //         const key = obj[property];
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         // Add object to list for given key's value
    //         acc[key].push(obj);
    //         return acc;
    //     }, {});
    // }



// export const getparams = (appl, roomid, areaid, startDate, endDate) => {
//     // console.log(appl, roomid, areaid, startDate, endDate)

//     const res = axios.get(
//         //`http://192.168.0.155:3002/api/user?app=${appl}&startDate=${startDate}&endDate=${endDate}&area=${2}&room=${10}`
//         "http://192.168.0.155:3002/api/user?app=LAF&startDate=2023/2/28 10:42:00&endDate=2023/2/28 23:59:59&area=2&room=10"

//     )
//         .then((res) => {
//             console.log("Getting DATA", res.data);
//             // Data = (res.data);
//             dispatchUpdateData(res.data)
//             console.log("set data successfully...")

//         })
//     // dispatchUpdateData(Data)
// }


    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch(
    //             `http://192.168.0.155:3002/api/user?app=${appl}&startDate=${startDate}&endDate=${endDate}&area=${2}&room=${10}`
    //             // "http://192.168.0.155:3002/api/user?app=LAF&startDate=2023/2/28 10:42:00&endDate=2023/2/28 23:59:59&area=2&room=10"
    //         );
    //         const json = await res.json();
    //         dispatchUpdateData(json)
    //     };
    //     fetchData();
    // }, [])




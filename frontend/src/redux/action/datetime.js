import { DATETIME_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateDateTime = (startDateTime, endDateTime) => {

    const date0 = new Date(startDateTime)
    const updatedDate01 =`${date0.toLocaleTimeString("en-US",{ hours: "numeric", minutes: "2-digit", seconds: "2-digit", hourCycle:"h23" })}`
    const newStartDate = `${(date0.getFullYear())}/${((date0.getMonth() + 1)<10?'0':'')+(date0.getMonth() + 1)}/${(date0.getDate()<10?'0':'')+(date0.getDate())} ${updatedDate01}`
    

    const date1 = new Date(endDateTime)
    const updatedDate11 =`${date1.toLocaleTimeString("en-US",{ hours: "numeric", minutes: "2-digit", seconds: "2-digit", hourCycle:"h23"})}`
    const newEndDate = `${(date1.getFullYear())}/${(((date1.getMonth() + 1)<10?'0':''))+(date1.getMonth() + 1)}/${(date1.getDate()<10?'0':'')+(date1.getDate())} ${updatedDate11}`

    // const newStartDate = new Date(startDateTime).toLocaleString("en-Us",{hourCycle:"h23"}).replace(",","")
    // const newEndDate = new Date(endDateTime).toLocaleString("en-Us",{hourCycle:"h23"}).replace(",","")

	return({
		type:DATETIME_UPDATED ,
        newStartDate, 
        newEndDate
	})
     }


     export const dispatchUpdateDateTime = bindActionCreators(updateDateTime , store.dispatch)
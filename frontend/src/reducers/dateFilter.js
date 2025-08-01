import {
  DATE_FILTER_DATE_UPDATED,
} from "../constants/dateFilter";
import { RESET } from "../constants/common";

export const initialState = {

  startDate: null,
  endDate: null,

};

const dateF = (state = initialState, { type, updatedDate }) => {


  switch (type) {
    case DATE_FILTER_DATE_UPDATED:
      const date0 = new Date(updatedDate[0])
      const updatedTime0 = `${date0.toLocaleTimeString("en-US",{ hours: "numeric", minutes: "2-digit", seconds: "2-digit", hourCycle: "h23" })}`.split(":").join("-").replace(" ","")
      const updatedDate0 = `${(date0.getFullYear())}-${(date0.getMonth() + 1)}-${(date0.getDate())}-${updatedTime0}`

      const date1 = new Date(updatedDate[1])
      const updatedTime1 = `${date1.toLocaleTimeString("en-US",{ hours: "numeric", minutes: "2-digit", seconds: "2-digit", hourCycle: "h23" })}`.split(":").join("-").replace(" ","")
      const updatedDate1 = `${(date1.getFullYear())}-${(date1.getMonth() + 1)}-${(date1.getDate())}-${updatedTime1}`
      
      return {
        ...state,
        startDate: updatedDate0,
        endDate: updatedDate1,

        // startDate: updatedDate[0].toLocaleString().replaceAll(",",""),
        // endDate: updatedDate[1].toLocaleString().replaceAll(",",""),
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};


export default dateF;

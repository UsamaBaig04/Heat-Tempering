import { REPORT_UPDATED, RESET } from "../constants/report";

const initialState = {
   report: ""
}

const Report = (state = initialState, { type, reportM }) => {
   switch (type) {
      case REPORT_UPDATED:
         return {
            ...state, report: reportM
         }
      case RESET:
         return initialState;
      default:
         return state;
   }
}


export default Report;
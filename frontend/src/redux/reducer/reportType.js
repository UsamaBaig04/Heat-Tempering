import { REPORT_TYPE_UPDATED, RESET } from "../constants/report";

const initialState = {
   reportType: ""
}

const Report = (state = initialState, { type, reportT }) => {
   switch (type) {
      case REPORT_TYPE_UPDATED:
         return {
            ...state, reportType: reportT
         }
      case RESET:
         return initialState;
      default:
         return state;
   }
}


export default Report;
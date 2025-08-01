import { REPORT_TYPE_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateReportType = ( reportT) => {
	return({
		type:REPORT_TYPE_UPDATED ,
        reportT
	})
     }


     export const dispatchUpdateReportType = bindActionCreators(updateReportType , store.dispatch)
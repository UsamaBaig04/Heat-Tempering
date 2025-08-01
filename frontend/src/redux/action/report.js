import { REPORT_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateReport = ( reportM) => {
	return({
		type:REPORT_UPDATED ,
        reportM
	})
}


     export const dispatchUpdateReport = bindActionCreators(updateReport , store.dispatch)
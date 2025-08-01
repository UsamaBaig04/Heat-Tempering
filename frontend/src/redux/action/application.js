import { APPLICATION_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateApplication = ( appl) => {
	return({
		type:APPLICATION_UPDATED ,
        appl
	})
     }


     export const dispatchUpdateApplication = bindActionCreators(updateApplication , store.dispatch)
import { GROUBY_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateGroupBy = (groupByValue, groupBylabel) => {
	return({
		type:GROUBY_UPDATED ,
        groupBylabel,
        groupByValue
	})
     }


     export const dispatchUpdateGroupBy = bindActionCreators(updateGroupBy , store.dispatch)
import { AREA_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateArea = ( Area, areaID) => {
	return({
		type:AREA_UPDATED ,
        Area,
        areaID
	})
     }


     export const dispatchUpdateArea = bindActionCreators(updateArea , store.dispatch)
import { AREA_UPDATED, RESET } from "../constants/report";

const initialState = {
    area: "",
    areaid:""
}

const Area = (state = initialState, { type, Area , areaID}) => {
    switch (type) {
        case AREA_UPDATED:
            return {
                ...state, area: Area, areaid : areaID
            }
        case RESET:
            return initialState;
        default:
            return state;
    }
}


export default Area;
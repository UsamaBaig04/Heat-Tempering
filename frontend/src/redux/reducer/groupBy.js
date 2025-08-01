import { GROUBY_UPDATED, RESET } from "../constants/report";

const initialState = {
    groupBylabel: "",
    groupByValue:""
}

const GroupBy = (state = initialState, { type, groupBylabel,groupByValue}) => {
    switch (type) {
        case GROUBY_UPDATED:
            return {
                ...state, groupBylabel,groupByValue
            }
        case RESET:
            return initialState;
        default:
            return state;
    }
}


export default GroupBy;
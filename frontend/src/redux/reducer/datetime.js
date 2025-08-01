import { DATETIME_UPDATED, RESET } from "../constants/report";

const initialState = {
    startDate:"",
    endDate:""
}

const DateTime = (state = initialState, { type, newStartDate, newEndDate }) => {
    switch (type) {
        case DATETIME_UPDATED:
            return {
                ...state, startDate: newStartDate, endDate:newEndDate
            }
        case RESET:
            return initialState;
        default:
            return state;
    }
}


export default DateTime;
import { APPLICATION_UPDATED, RESET } from "../constants/report";

const initialState = {
    application: ""
}

const Application = (state = initialState, { type, appl }) => {
    switch (type) {
        case APPLICATION_UPDATED:
            return {
                ...state, application: appl
            }
        case RESET:
            return initialState;
        default:
            return state;
    }
}


export default Application;
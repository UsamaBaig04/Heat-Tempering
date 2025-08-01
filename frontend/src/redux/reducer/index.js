import { combineReducers } from 'redux';
import { RESET } from '../constants/report';
import Report from './report';
import ReportType from './reportType';
import Application from './application';
import Area from './area';
import Room from './room';
import DateTime from './datetime';
import Data from './data';
import GroupBy from './groupBy'

const appReducer = combineReducers({
    Report,
    ReportType,
    Application,
    Area,
    Room,
    DateTime,
    GroupBy, 
    Data

})

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;
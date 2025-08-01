import {
    REPORT_DATA_UPDATED
  } from "../constants/reportData";


 export const updateparametersReport = (items) => dispatch => {
    dispatch({ type: REPORT_DATA_UPDATED, items});
  };

  export const updateDataLoctiteDispenser = (items) => dispatch => {
    dispatch({ type: REPORT_DATA_UPDATED, items});
  };

  
  export const updateDataCapBallPress = (items) => dispatch => {
    dispatch({ type: REPORT_DATA_UPDATED, items});
  };

  
    
  

  
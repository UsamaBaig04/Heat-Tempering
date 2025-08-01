import {
    SERIAL_NUMBER_UPDATED,
  } from "../constants/reportData";

  export const updateSerialNumber = (updatedSrlNo) => dispatch => {
    dispatch({ type: SERIAL_NUMBER_UPDATED, updatedSrlNo});
  };
  
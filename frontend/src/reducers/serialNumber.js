import {
    SERIAL_NUMBER_UPDATED,
  } from "../constants/reportData";

  import { RESET } from "../constants/common";
  
  export const initialState = {
    serialNumber: null,
  };
  

  const srlNo = (state = initialState, { type, updatedSrlNo }) => {
    switch (type) {
      case SERIAL_NUMBER_UPDATED:
        return {
          ...state,
          serialNumber: updatedSrlNo,
        };
      case RESET:
        return initialState;
      default:
        return state;
    }
  };
  
  
  export default srlNo;
  
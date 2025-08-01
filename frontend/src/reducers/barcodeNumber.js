import {
  BARCODE_NUMBER_UPDATED,
  } from "../constants/reportData";

  import { RESET } from "../constants/common";
  
  export const initialState = {
    barcodeNumber: null,
  };
  

  const barcodNo = (state = initialState, { type, updatedbarcodNo }) => {
    switch (type) {
      case BARCODE_NUMBER_UPDATED:
        return {
          ...state,
          barcodeNumber: updatedbarcodNo,
        };
      case RESET:
        return initialState;
      default:
        return state;
    }
  };
  
  
  export default barcodNo;
  
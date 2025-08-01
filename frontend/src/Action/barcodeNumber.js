import {
  BARCODE_NUMBER_UPDATED,
  } from "../constants/reportData";

  export const updateBarcodeNumber = (updatedbarcodNo) => dispatch => {
    dispatch({ type: BARCODE_NUMBER_UPDATED, updatedbarcodNo});
  };
  
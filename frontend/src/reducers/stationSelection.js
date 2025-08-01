import {
  STATION_SELECTION_UPDATED,
  } from "../constants/reportData";

  import { RESET } from "../constants/common";
  
  export const initialState = {
    staionSelected: null,
  };
  

  const sationSelect = (state = initialState, { type, updatedStation }) => {
    switch (type) {
      case STATION_SELECTION_UPDATED:
        return {
          ...state,
          staionSelected: updatedStation,
        };
      case RESET:
        return initialState;
      default:
        return state;
    }
  };
  
  
  export default sationSelect;
  
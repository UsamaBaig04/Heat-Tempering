import {
  STATION_SELECTION_UPDATED,
  } from "../constants/reportData";

  export const updateSationSelection = (updatedStation) => dispatch => {
    dispatch({ type: STATION_SELECTION_UPDATED, updatedStation});
  };
  
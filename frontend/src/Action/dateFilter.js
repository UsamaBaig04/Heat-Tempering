import {

  DATE_FILTER_START_DATE_UPDATED,
  DATE_FILTER_END_DATE_UPDATED,
  DATE_FILTER_DATE_UPDATED
} from "../constants/dateFilter";



export const updateDate = (updatedDate) => dispatch => {
  dispatch({ type: DATE_FILTER_DATE_UPDATED, updatedDate});
};





export const updateStartDate = updatedStartDate => dispatch => {
  dispatch({ type: DATE_FILTER_START_DATE_UPDATED, updatedStartDate });
};

export const updateEndDate = updatedEndDate => dispatch => {
  dispatch({ type: DATE_FILTER_END_DATE_UPDATED, updatedEndDate });
};



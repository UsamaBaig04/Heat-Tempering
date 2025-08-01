import { RESET } from "../constants/common";

export const reset = preserveError => dispatch => {
  dispatch({ type: RESET, preserveError });
};

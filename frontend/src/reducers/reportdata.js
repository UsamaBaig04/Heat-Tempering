import { RESET } from "../constants/common";
import {
  REPORT_DATA_UPDATED,
} from "../constants/reportData";

export const initialState = {
  reportItems: [],
};

export default (state = initialState, { type, items }) => {
  switch (type) {
    case REPORT_DATA_UPDATED:
      return { ...state, reportItems:items };
      case RESET:
        return initialState;
    default:
      return state;
  }
};
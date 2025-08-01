import { combineReducers } from "redux";
import dateFilter from "./dateFilter"
import mqtt from "./mqtt";
import reportdata from "./reportdata";
import srlNo from "./serialNumber";
import barcodNo from "./barcodeNumber";
import sationSelect from "./stationSelection";

export default combineReducers({
  mqtt,
  dateFilter,
  reportdata,
  srlNo,
  barcodNo,
  sationSelect
});

export const isLoading = state => fromRequest.isLoading(state.request);
export const isResetDisabled = state => state.params.isResetDisabled && state.filters.items.length === 0;

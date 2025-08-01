import {
  MQTT_MSG_UPDATED,
  MQTT_SETCLIENT,
  MQTT_STS_UPDATED,
} from "../constants/mqtt";

export const setMessage = msg => dispatch => {
  dispatch({ type: MQTT_MSG_UPDATED, msg });
};

export const setClient = client => dispatch => {
  dispatch({ type: MQTT_SETCLIENT, client });
};

export const setStatus = status => dispatch => {
  dispatch({ type: MQTT_STS_UPDATED, status });
};

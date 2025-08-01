import {
  MQTT_MSG_UPDATED,
  MQTT_SETCLIENT,
  MQTT_STS_UPDATED,
} from "../constants/mqtt";


export const initialState = {
  client: null,
  status: "Connect",
  items: {},
};

 const  Mqtt = (state = initialState, { type, msg, client, status }) => {
  switch (type) {
    case MQTT_SETCLIENT:
      return { ...state, client };
    case MQTT_STS_UPDATED:
      return { ...state, status };
    case MQTT_MSG_UPDATED:
      return { ...state, items: {...state.items, [msg.topic]: msg.message} };
    default:
      return state;
  }
};

export default Mqtt
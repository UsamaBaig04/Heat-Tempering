import { ROOM_UPDATED } from "../constants/report";
import { store } from "../store/store";
import { bindActionCreators } from "redux";

const updateRoom = (Room , roomId, range) => {
    return ({
        type: ROOM_UPDATED,
        Room,
        roomId,
        range
    })
}


export const dispatchUpdateRoom = bindActionCreators(updateRoom, store.dispatch)
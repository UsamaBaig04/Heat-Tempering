import { ROOM_UPDATED, RESET } from "../constants/report";

const initialState = {
    room: "",
    roomid:"",
    range:""
}

const Application = (state = initialState, { type, Room , roomId,range}) => {
    switch (type) {
        case ROOM_UPDATED:
            return {
                ...state, room: Room, roomid:roomId,range
            }
        case RESET:
            return initialState;
        default:
            return state;
    }
}


export default Application;
import {DATA_UPDATED, DATA_REQUEST_ERROR, DATA_REQUEST} from '../constants/report'

const initialState = {
items:[],
tableColumn:[],
loader:false
}

export default function(state = initialState, {type, data, columnTable}){

    switch(type){

        case DATA_REQUEST:
        return {
            ...state,loader:true
        }
        case DATA_UPDATED:
        return {
            ...state, items:data, tableColumn:columnTable, loader:false
        }
        case DATA_REQUEST_ERROR:
        return {
            ...state, loader:false
        }
        default: return state
    }

}
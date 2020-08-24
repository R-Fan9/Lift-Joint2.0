import { GET_APOST } from '../actions/types.js';


const initialState = []

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_APOST:
            return (state=[action.payload]);
        default:
            return state;
    }
}
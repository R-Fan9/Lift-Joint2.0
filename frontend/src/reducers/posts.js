import { FAVOUR_POST, GET_ALLPOST } from '../actions/types';

const initialState = {
    allpost: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALLPOST:
            return {
                ...state,
                allpost: action.payload.map(p => {
                    return {
                        ...p,
                        content:JSON.parse(p.content)
                    }
                })
            };
        case FAVOUR_POST:
            return{
                ...state,
                allpost: state.allpost.map(p => {
                    if(p.id == action.payload.id){
                        return action.payload
                    }
                    return p
                })
            }
        default:
            return state;
    }

}
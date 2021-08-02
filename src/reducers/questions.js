import {RETAKE, GET_QUESTIONS} from "../actions/types";
import {Questions} from "../shared/questions";


/// intial State
const initialState = {
    questions : Questions
}

/// reducer
export const QuestionBank =  (state = initialState, action) =>{
    switch (action.type) {
        case GET_QUESTIONS:
            return {...state, questions: action.payload}
           
        case RETAKE:
            return {...state, questions: Questions};
           
        default:
            return state;
            
    }
}
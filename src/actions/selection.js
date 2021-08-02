import {RETAKE, GET_QUESTIONS} from "./types";
import { Questions } from '../shared/questions';



///fetching the questions
export const fetch = () =>dispatch =>{
    const questions = Questions
    dispatch(getQuestions(questions));
}

export const getQuestions = (questions) =>({
    type: GET_QUESTIONS,
    payload: questions
})

/// resetting the state
export const retake = () => dispatch =>{
    localStorage.removeItem("0")
    localStorage.removeItem("1")
    localStorage.removeItem("2")
    localStorage.removeItem("3")
    dispatch(reset());
}

export const reset = () =>({
    type: RETAKE
})
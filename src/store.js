import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {QuestionBank} from "./reducers/questions";

/// creating the store of reducers with necessary middleware
export const store = createStore(
    combineReducers({
        QuestionBank: QuestionBank
    }),
    applyMiddleware(thunk)
);
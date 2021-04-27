import {combineReducers} from "redux";
import {todoListReducer} from "./todoListReducer";

export const rootReducer = combineReducers({
    todos:todoListReducer
})

export type RootState = ReturnType<typeof rootReducer>
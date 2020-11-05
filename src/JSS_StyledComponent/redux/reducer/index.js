import { combineReducers } from "redux";
import TodoListReducer from "./TodoListReducer";

const rootReducer = combineReducers({
  TodoListReducer,
});

export default rootReducer;

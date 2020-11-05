import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ADD_TASK } from "../constant";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
  ],
};

const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      if (action.payload === "") {
        alert("Task name is required");
        return { ...state };
      }

      const index = state.taskList.findIndex((item) => {
        return item.taskName === action.payload;
      });
      if (index !== -1) {
        alert("Task name already exist");
        return { ...state };
      }
      let newTask = {
        id: Math.random(),
        taskName: action.payload,
        done: false,
      };
      state.taskList = [...state.taskList, newTask];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default TodoListReducer;

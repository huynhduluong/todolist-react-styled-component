import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../Themes/ToDoListPrimaryTheme";
import {
  ADD_TASK,
  CHANGE_STATUS_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../constant";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
  ],
  editTask: { id: -1, taskName: "", done: false },
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
    case CHANGE_THEME: {
      let theme = arrTheme.find((theme) => {
        return theme.id == action.payload;
      });
      if (theme) {
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    }
    case CHANGE_STATUS_TASK: {
      const index = state.taskList.findIndex((task) => {
        return task.id === action.payload.id;
      });
      let updateTaskList = [...state.taskList];
      if (index !== -1) {
        updateTaskList[index].done = !updateTaskList[index].done;
      }
      state.taskList = updateTaskList;
      return { ...state };
    }
    case DELETE_TASK: {
      let updateTaskList = [...state.taskList];
      updateTaskList = updateTaskList.filter((task) => {
        return task.id !== action.payload.id;
      });
      return { ...state, taskList: updateTaskList };
    }
    case EDIT_TASK: {
      state.editTask = action.payload;
      return { ...state };
    }
    case UPDATE_TASK: {
      console.log(action.payload);
      const index = state.taskList.findIndex((task) => {
        return task.id === action.payload.id;
      });
      let updateList = [...state.taskList];
      updateList[index] = action.payload;
      state.editTask.id = -1;

      return { ...state, taskList: updateList };
    }
    default:
      return { ...state };
  }
};
export default TodoListReducer;

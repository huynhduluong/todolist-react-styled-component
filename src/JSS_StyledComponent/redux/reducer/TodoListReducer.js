import { arrTheme } from "../../Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import {
  CHANGE_THEME,
  EDIT_TASK,
  TASK_FAILED,
  TASK_REQUEST,
  TASK_SUCCESS,
} from "../constant";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  loading: false,
  taskList: null,
  err: null,
  editTask: { id: -1, taskName: "", status: "" },
};

const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_REQUEST: {
      state.loading = true;
      return { ...state };
    }
    case TASK_SUCCESS: {
      state.loading = false;
      state.taskList = action.payload;
      state.err = null;
      return { ...state };
    }
    case TASK_FAILED: {
      state.loading = false;
      state.taskList = null;
      state.err = action.payload;
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

    case EDIT_TASK: {
      state.loading = false;
      state.editTask = action.payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default TodoListReducer;

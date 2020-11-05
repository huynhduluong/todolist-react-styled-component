import { ADD_TASK, CHANGE_STATUS_TASK, CHANGE_THEME } from "../constant";

export const actAddTask = (newTask) => {
  return {
    type: ADD_TASK,
    payload: newTask,
  };
};

export const actChangeTheme = (codeTheme) => {
  return {
    type: CHANGE_THEME,
    payload: codeTheme,
  };
};

import {
  ADD_TASK,
  CHANGE_STATUS_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../constant";

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

export const actChangeStatusTask = (task) => {
  return {
    type: CHANGE_STATUS_TASK,
    payload: task,
  };
};

export const actDeleteTask = (task) => {
  return {
    type: DELETE_TASK,
    payload: task,
  };
};
export const actEditTask = (task) => {
  return {
    type: EDIT_TASK,
    payload: task,
  };
};

export const actUpdateTask = (task) => {
  return {
    type: UPDATE_TASK,
    payload: task,
  };
};

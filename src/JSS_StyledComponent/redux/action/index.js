import Axios from "axios";
import {
  CHANGE_THEME,
  EDIT_TASK,
  TASK_FAILED,
  TASK_REQUEST,
  TASK_SUCCESS,
} from "../constant";

export const actChangeTheme = (codeTheme) => {
  return {
    type: CHANGE_THEME,
    payload: codeTheme,
  };
};

export const actGetTaskApi = (uri, method = "GET", data) => {
  return (dispatch) => {
    dispatch(actTaskRequest());
    Axios({
      url: `https://5f5c7a345e3a4d001624941b.mockapi.io/TaskTodo/${uri}`,
      method,
      data,
    })
      .then((result) => {
        if (method !== "GET") {
          dispatch(actGetTaskApi("", "GET", ""));
        } else if (method === "GET" && uri !== "") {
          dispatch(actEditTask(result.data));
        } else {
          dispatch(actTaskSuccess(result.data));
        }
      })
      .catch((err) => {
        dispatch(actTaskFailed(err));
      });
  };
};

export const actTaskRequest = () => {
  return {
    type: TASK_REQUEST,
  };
};

export const actTaskSuccess = (data) => {
  return {
    type: TASK_SUCCESS,
    payload: data,
  };
};
export const actTaskFailed = (err) => {
  return {
    type: TASK_FAILED,
    payload: err,
  };
};

export const actEditTask = (task) => {
  return {
    type: EDIT_TASK,
    payload: task,
  };
};



import { ADD_TASK } from "../constant";

export const actAddTask = (newTask) => {
  return {
    type: ADD_TASK,
    payload: newTask,
  };
};

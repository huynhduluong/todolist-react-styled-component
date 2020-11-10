import React, { useEffect, useState } from "react";
import { Dropdown } from "./../components/Dropdown";
import { ThemeProvider } from "styled-components";
import { Container } from "../components/Container";
import { Heading3 } from "./../components/Heading";
import { TextField } from "../components/TextField";
import { Button } from "./../components/Button";
import { Table, Tr, Th, Thead } from "../components/Table";
import { connect } from "react-redux";
import { actChangeTheme, actGetTaskApi } from "../redux/action";
import { arrTheme } from "../Themes/ThemeManager";
import Loader from "../components/Loader";

function ToDoList_Hook(props) {
  const [state, setState] = useState({
    data: { id: "", textTask: "", status: "todo" },
    disabled: true,
  });

  useEffect(() => {
    console.log("did mount");
    props.handleGetTaskApi();
  }, []);

  useEffect(() => {
    console.log("did update");
    if (props.editTask.id !== "") {
      let { textTask, id, status } = props.editTask;
      setState({
        ...state,
        data: { id, textTask, status },
      });
    }
  }, [props.editTask.id]);

  const renderTaskTodo = () => {
    let { taskList } = props;
    if (taskList && taskList.length > 0) {
      return taskList
        .filter((item) => {
          return item.status === "todo";
        })
        .map((task) => {
          return (
            <Tr key={task.id}>
              <Th style={{ verticalAlign: "middle" }}>{task.textTask}</Th>
              <Th className="text-right">
                <Button
                  className="ml-1"
                  onClick={() => {
                    props.handleEditTask(task);
                    setState({
                      ...state,
                      disabled: false,
                    });
                  }}
                >
                  <i className="fa fa-edit"></i>
                </Button>
                <Button
                  className="ml-1"
                  onClick={() => {
                    props.handleChangeStatusTask(task);
                  }}
                >
                  <i className="fa fa-check"></i>
                </Button>
                <Button
                  className="ml-1"
                  onClick={() => {
                    props.handleDeleteTask(task);
                  }}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </Th>
            </Tr>
          );
        });
    }
  };

  const renderTaskCompleted = () => {
    let { taskList } = props;
    if (taskList && taskList.length > 0) {
      return taskList
        .filter((item) => {
          return item.status === "completed";
        })
        .map((task) => {
          return (
            <Tr key={task.id}>
              <Th
                style={{
                  verticalAlign: "middle",
                  textDecoration: "line-through",
                }}
              >
                {task.textTask}
              </Th>
              <Th className="text-right">
                <Button
                  className="ml-1"
                  onClick={() => {
                    props.handleChangeStatusTask(task);
                  }}
                >
                  <i class="fa fa-undo"></i>
                </Button>
                <Button
                  className="ml-1"
                  onClick={() => {
                    props.handleDeleteTask(task);
                  }}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </Th>
            </Tr>
          );
        });
    }
  };

  const renderTheme = () => {
    return arrTheme.map((theme) => {
      return (
        <option value={theme.id} key={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  if (props.loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={props.themeToDoList}>
      <Container className="w-50">
        <Dropdown
          onChange={(e) => {
            let { value } = e.target;
            props.handleChangeTheme(value);
          }}
        >
          {renderTheme()}
        </Dropdown>
        <Heading3>To do list</Heading3>
        <TextField
          label="Task name"
          className="w-50"
          name="textTask"
          value={state.data.textTask}
          onChange={(e) => {
            let { name, value } = e.target;
            setState({
              ...state,
              data: { ...state.data, [name]: value },
            });
          }}
        />

        {state.disabled ? (
          <Button
            className="ml-2"
            onClick={() => {
              props.handleAddTask(state.data);
            }}
          >
            <i className="fa fa-plus mr-1"></i>
            Add Task
          </Button>
        ) : (
          <Button
            disabled={state.disabled}
            className="ml-2"
            onClick={() => {
              let { data } = state;
              props.handleUpdateTask(data);
              setState({
                data: { id: "", textTask: "", status: "todo" },
                disabled: true,
              });
            }}
          >
            <i className="fa fa-upload mr-1"></i>
            Update Task
          </Button>
        )}

        <hr />
        <Heading3>Task To Do</Heading3>
        <Table>
          <Thead>{renderTaskTodo()}</Thead>
        </Table>

        <Heading3>Task Completed</Heading3>
        <Table>
          <Thead>{renderTaskCompleted()}</Thead>
        </Table>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.TodoListReducer.themeToDoList,
    loading: state.TodoListReducer.loading,
    err: state.TodoListReducer.err,
    taskList: state.TodoListReducer.taskList,
    editTask: state.TodoListReducer.editTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetTaskApi: () => {
      dispatch(actGetTaskApi("", "GET", ""));
    },

    handleAddTask: (newTask) => {
      dispatch(actGetTaskApi("", "POST", newTask));
    },

    handleChangeTheme: (codeTheme) => {
      dispatch(actChangeTheme(codeTheme));
    },

    handleChangeStatusTask: (task) => {
      if (task.status === "completed") {
        task.status = "todo";
      } else {
        task.status = "completed";
      }
      dispatch(actGetTaskApi(task.id, "PUT", task));
    },

    handleDeleteTask: (task) => {
      dispatch(actGetTaskApi(task.id, "DELETE", ""));
    },

    handleEditTask: (task) => {
      dispatch(actGetTaskApi(task.id, "GET", ""));
    },

    handleUpdateTask: (task) => {
      dispatch(actGetTaskApi(task.id, "PUT", task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList_Hook);

import { Dropdown } from "./../components/Dropdown";
import React, { Component } from "react";
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

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { id: "", textTask: "", status: "todo" },
      disabled: true,
    };
  }

  componentDidMount() {
    this.props.handleGetTaskApi();
  }

  componentDidUpdate(prevProps, prevState) {
    //so sánh nếu như props trước đó taskEdit trước mà khác taskEdit hiện tại thì mình mới setState
    if (prevProps.editTask.id !== this.props.editTask.id) {
      let { textTask, id, status } = this.props.editTask;
      this.setState({
        data: { id, textTask, status },
      });
    }
  }

  renderTaskTodo = () => {
    let { taskList } = this.props;
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
                    this.setState(
                      {
                        disabled: false,
                      },
                      () => {
                        this.props.handleEditTask(task);
                      }
                    );
                  }}
                >
                  <i className="fa fa-edit"></i>
                </Button>
                <Button
                  className="ml-1"
                  onClick={() => {
                    this.props.handleChangeStatusTask(task);
                  }}
                >
                  <i className="fa fa-check"></i>
                </Button>
                <Button
                  className="ml-1"
                  onClick={() => {
                    this.props.handleDeleteTask(task);
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
  renderTaskCompleted = () => {
    let { taskList } = this.props;
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
                    this.props.handleChangeStatusTask(task);
                  }}
                >
                  <i class="fa fa-undo"></i>
                </Button>
                <Button
                  className="ml-1"
                  onClick={() => {
                    this.props.handleDeleteTask(task);
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

  renderTheme = () => {
    return arrTheme.map((theme) => {
      return (
        <option value={theme.id} key={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  render() {
    let { loading } = this.props;
    if (loading) {
      return <Loader />;
    }
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.handleChangeTheme(value);
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField
            label="Task name"
            className="w-50"
            name="textTask"
            value={this.state.data.textTask}
            onChange={(e) => {
              let { name, value } = e.target;
              this.setState({
                data: { ...this.state.data, [name]: value },
              });
            }}
          />

          {this.state.disabled ? (
            <Button
              className="ml-2"
              onClick={() => {
                this.props.handleAddTask(this.state.data);
              }}
            >
              <i className="fa fa-plus mr-1"></i>
              Add Task
            </Button>
          ) : (
            <Button
              disabled={this.state.disabled}
              className="ml-2"
              onClick={() => {
                let { data } = this.state;
                this.setState(
                  {
                    data: { id: "", textTask: "", status: false },
                    disabled: true,
                  },
                  () => {
                    this.props.handleUpdateTask(data);
                  }
                );
              }}
            >
              <i className="fa fa-upload mr-1"></i>
              Update Task
            </Button>
          )}

          <hr />
          <Heading3>Task To Do</Heading3>
          <Table>
            <Thead>{this.renderTaskTodo()}</Thead>
          </Table>

          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);

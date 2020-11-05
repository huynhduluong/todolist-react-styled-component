import { Dropdown } from "./../components/Dropdown";
import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../components/Container";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "./../components/Heading";
import { TextField } from "../components/TextField";
import { Button } from "./../components/Button";
import { Table, Tr, Th, Thead } from "../components/Table";
import { connect } from "react-redux";
import {
  actAddTask,
  actChangeStatusTask,
  actChangeTheme,
  actDeleteTask,
  actEditTask,
  actUpdateTask,
} from "../redux/action";
import { arrTheme } from "../Themes/ThemeManager";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { id: "", taskName: "", done: false },
      disabled: true,
    };
  }

  //không dùng được getDerivedStateFromProps(newProps, currentState)

  // static getDerivedStateFromProps(newProps, currentState) {
  //   if (newProps && newProps.editTask.taskName !== currentState.taskName) {
  //     return {
  //       ...currentState,
  //       id: newProps.editTask.id,
  //       taskName: newProps.editTask.taskName,
  //       done: newProps.editTask.done,
  //     };
  //   }
  //   console.log(newProps, currentState);
  //   return null;
  // }

  //đây là lifecycle trả về props cũ và state cũ của component trước khi render nhưng chạy sau render

  componentDidUpdate(prevProps, prevState) {
    //so sánh nếu như props trước đó taskEdit trước mà khác taskEdit hiện tại thì mình mới setState
    if (prevProps.editTask.id !== this.props.editTask.id) {
      let { taskName, id, done } = this.props.editTask;
      this.setState({
        data: { id, taskName, done },
      });
    }
  }

  renderTaskTodo = () => {
    return this.props.taskList
      .filter((item) => {
        return !item.done;
      })
      .map((task) => {
        return (
          <Tr key={task.id}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
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
  };
  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((item) => {
        return item.done;
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
              {task.taskName}
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
            name="taskName"
            value={this.state.data.taskName}
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
                this.props.handleAddTask(this.data.value.taskName);
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
                    data: { id: "", taskName: "", done: false },
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
    taskList: state.TodoListReducer.taskList,
    editTask: state.TodoListReducer.editTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTask: (newTask) => {
      dispatch(actAddTask(newTask));
    },
    handleChangeTheme: (codeTheme) => {
      dispatch(actChangeTheme(codeTheme));
    },
    handleChangeStatusTask: (task) => {
      dispatch(actChangeStatusTask(task));
    },
    handleDeleteTask: (task) => {
      dispatch(actDeleteTask(task));
    },
    handleEditTask: (task) => {
      dispatch(actEditTask(task));
    },
    handleUpdateTask: (task) => {
      dispatch(actUpdateTask(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);

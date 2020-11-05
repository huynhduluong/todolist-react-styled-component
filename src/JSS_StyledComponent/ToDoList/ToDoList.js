import { Dropdown } from "./../components/Dropdown";
import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../components/Container";
import { ToDoListDarkTheme } from "../Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../Themes/ToDoListPrimaryTheme";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "./../components/Heading";
import { TextField } from "../components/TextField";
import { Button } from "./../components/Button";
import { Table, Tr, Td, Th, Thead, Tbody } from "../components/Table";
import { connect } from "react-redux";
import { actAddTask, actChangeTheme } from "../redux/action";
import { arrTheme } from "../Themes/ThemeManager";

class ToDoList extends Component {
  state = {
    taskName: "",
  };

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
              <Button className="ml-1">
                <i className="fa fa-edit"></i>
              </Button>
              <Button className="ml-1">
                <i className="fa fa-check"></i>
              </Button>
              <Button className="ml-1">
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
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-1">
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
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
          />
          <Button
            className="ml-2"
            onClick={() => {
              this.props.handleAddTask(this.state.taskName);
            }}
          >
            <i className="fa fa-plus mr-1"></i>
            Add Task
          </Button>
          <Button className="ml-2">
            <i className="fa fa-upload mr-1"></i>
            Update Task
          </Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);

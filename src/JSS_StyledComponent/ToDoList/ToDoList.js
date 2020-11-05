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

export default class ToDoList extends Component {
  render() {
    return (
      <ThemeProvider theme={ToDoListDarkTheme}>
        <Container className="w-50">
          <Dropdown>
            <option>Dark Theme</option>
            <option>Light Theme</option>
            <option>Primary Theme</option>
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField label="Task name" className="w-50" />
          <Button className="ml-2">
            <i className="fa fa-plus"></i>
            Add Task
          </Button>
          <Button className="ml-2">
            <i className="fa fa-upload"></i>
            Add Task
          </Button>
          <hr />
          <Heading3>Task To Do</Heading3>
          <Table>
            <Thead>
              <Tr>
                <Th style={{ verticalAlign: "middle" }}>Task name</Th>
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
              <Tr>
                <Th style={{ verticalAlign: "middle" }}>Task name</Th>
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
            </Thead>
          </Table>

          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>
              <Tr>
                <Th style={{ verticalAlign: "middle" }}>Task name</Th>
                <Th className="text-right">
                  <Button>
                    <i className="fa fa-trash"></i>
                  </Button>
                </Th>
              </Tr>
              <Tr>
                <Th style={{ verticalAlign: "middle" }}>Task name</Th>
                <Th className="text-right">
                  <Button>
                    <i className="fa fa-trash"></i>
                  </Button>
                </Th>
              </Tr>
            </Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

const configDarkTheme = {
  background: "#000",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "15px",
};
const configLightTheme = {
  background: "#6633ff",
  color: "#fff",
  fontWeight: "300",
  fontSize: "20px",
};

export default class DemoThemes extends Component {
  state = {
    currentTheme: configDarkTheme,
  };
  handleChangeTheme = (e) => {
    this.setState({
      currentTheme: e.target.value == "1" ? configDarkTheme : configLightTheme,
    });
  };

  render() {
    const DivStyle = styled.div`
      color: ${(props) => props.theme.color};
      padding: 5%;
      background-color: ${(props) => props.theme.background};
      font-size: ${(props) => props.theme.fontSize};
      font-weight: ${(props) => props.theme.fontWeight};
    `;
    return (
      <ThemeProvider theme={this.state.currentTheme}>
        <DivStyle>Hello mình là yasua thông thạo 7</DivStyle>
        <select onChange={this.handleChangeTheme}>
          <option value="1">Dark Theme</option>
          <option value="2">Light Theme</option>
        </select>
      </ThemeProvider>
    );
  }
}

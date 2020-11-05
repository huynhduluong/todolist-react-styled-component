import React, { Component } from "react";
import { StyledLink } from "../components/Link";
import { TextField } from "../components/TextField";
import { Button, SmallButton } from "./../components/Button";

export default class DemoJSS extends Component {
  render() {
    return (
      <div>
        <Button primary fontSize2x>
          Click me
        </Button>
        <SmallButton>Small button</SmallButton>
        <StyledLink>a hi hi</StyledLink>
        <TextField inputColor="" />
      </div>
    );
  }
}

import styled from "styled-components";

export const Button = styled.button`
  color: #fff;
  background: ${(props) => (props.primary ? "blue" : "green")};
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: ${(props) => (props.fontSize2x ? "2rem" : "1rem")};
  padding: 1rem;
  opacity: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: all 0.5s;
  }
`;

export const SmallButton = styled(Button)`
  background-color: orange;
  font-size: 0.5rem;
  padding: 0.5rem;
`;

import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-30%, -50%);
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid blue;
  border-right: 16px solid green;
  border-bottom: 16px solid red;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: ${spin} 2s linear infinite;
`;

export default function Loader() {
  return <Loading></Loading>;
}

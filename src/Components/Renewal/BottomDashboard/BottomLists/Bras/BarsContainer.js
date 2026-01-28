import React from "react";
import styled from "styled-components";
import BarGraph from "./BarGraph";

const BarsContainerMainDivBox = styled.div`
  height: 100%;
  width: 40%;
  min-width: 800px;
  height: calc(100vh - 350px);
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid darkgray;
  padding: 10px;
`;

const BarsContainer = () => {
  return (
    <BarsContainerMainDivBox>
      <BarGraph></BarGraph>
    </BarsContainerMainDivBox>
  );
};

export default BarsContainer;

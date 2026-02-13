import React from "react";
import styled from "styled-components";
import BarGraph from "./Bar/BarGraph";

const BottomListMainDivBox = styled.div`
  border: 1px solid lightgray;
  width: 990px;
  height: 500px;
  background-color: #fff;
  padding: 10px;
  margin-top: 50px;
`;

const BottomList = () => {
  return (
    <BottomListMainDivBox>
      <div>
        <div>
          <span>Monthly Inventory Value</span>
          <span>(KRW Million)</span>
        </div>
        <div style={{ height: "450px" }}>
          <BarGraph></BarGraph>
        </div>
      </div>
    </BottomListMainDivBox>
  );
};

export default BottomList;

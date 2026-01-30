import React from "react";
import styled from "styled-components";
import BarList from "./BarLists/BarList";

const BarGraphContainerMainDivBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .BarsContainers {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const BarGraphContainer = ({ data }) => {
  return (
    <BarGraphContainerMainDivBox>
      <div className="BarsContainers">
        {data.map((list, j) => {
          return <BarList list={list} ColorNumber={j}></BarList>;
        })}
      </div>
    </BarGraphContainerMainDivBox>
  );
};
export default BarGraphContainer;

import React from "react";
import styled from "styled-components";
import BarList from "./BarLists/BarList";

const BarGraphContainerMainDivBox = styled.div`
  height: 100%;

  .MainContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .BarsContainers {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
`;

const BarGraphContainer = ({ data }) => {
  return (
    <BarGraphContainerMainDivBox>
      <div className="MainContainer">
        <div className="BarsContainers">
          {data.map((list, j) => {
            return (
              <BarList key={list.code} list={list} ColorNumber={j}></BarList>
            );
          })}
        </div>
      </div>
    </BarGraphContainerMainDivBox>
  );
};
export default BarGraphContainer;

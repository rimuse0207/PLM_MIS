import React from "react";
import styled from "styled-components";
import DonutsContainer from "./Donuts/DonutsContainer";

import BarsContainer from "./Bras/BarsContainer";

const BottomListsContainerMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
`;

const BottomListsContainer = ({ type, data }) => {
  const typeRendering = () => {
    switch (type) {
      case "Donuts":
        return (
          <DonutsContainer
            data={data.sort((a, b) => b.value - a.value)}
          ></DonutsContainer>
        );
      case "Bars":
        return <BarsContainer data={data}></BarsContainer>;
      default:
        return <div></div>;
    }
  };
  return (
    <BottomListsContainerMainDivBox>
      {typeRendering()}
    </BottomListsContainerMainDivBox>
  );
};

export default BottomListsContainer;

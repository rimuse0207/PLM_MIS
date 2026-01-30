import React from "react";
import styled from "styled-components";
import DonutsContainer from "./Donuts/DonutsContainer";

import BarsContainer from "./Bras/BarsContainer";

const BottomListsContainerMainDivBox = styled.div`
  width: 50%;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
`;

const BottomListsContainer = ({ type, data }) => {
  const typeRendering = () => {
    switch (type) {
      case "Donuts":
        return (
          <DonutsContainer
            data={data
              .filter((item) => item.value !== 0)
              .sort((a, b) => b.value - a.value)}
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

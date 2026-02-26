import React from "react";
import styled from "styled-components";
import DonutsContainer from "./Donuts/DonutsContainer";

import BarsContainer from "./Bras/BarsContainer";

const BottomListsContainerMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  box-shadow: 2px 2px 5px 1px rgba(189, 215, 238, 0.6);
  border-radius: 10px;
`;

const BottomListsContainer = ({ type, data = [], bottomData }) => {
  const typeRendering = () => {
    switch (type) {
      case "Donuts":
        return (
          <DonutsContainer
            data={data?.sort((a, b) => b.value - a.value)}
            bottomData={bottomData}
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

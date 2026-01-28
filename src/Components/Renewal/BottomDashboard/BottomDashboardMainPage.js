import React from "react";
import styled from "styled-components";
import BottomListsContainer from "./BottomLists/BottomListsContainer";

const BottomDashboardMainPageMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
`;

const BottomDashboardMainPage = () => {
  return (
    <BottomDashboardMainPageMainDivBox>
      <BottomListsContainer type={"Donuts"}></BottomListsContainer>
      <BottomListsContainer type={"Bars"}></BottomListsContainer>
    </BottomDashboardMainPageMainDivBox>
  );
};

export default BottomDashboardMainPage;

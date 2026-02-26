import React from "react";
import styled from "styled-components";
import BottomListsContainer from "./BottomLists/BottomListsContainer";

export const BottomDashboardMainPageMainDivBox = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  color: #4d4d4d;
`;

export const ColorArray = [
  "#00c800",
  "#0066ff",
  "#ff0000",
  "#ffc000",
  "#6600cc",
];

const BottomDashboardMainPage = ({ bottomData }) => {
  return (
    <BottomDashboardMainPageMainDivBox>
      {bottomData.map((list) => {
        return (
          <BottomListsContainer
            key={list.type}
            type={list.type}
            data={list.data}
            bottomData={bottomData}
          ></BottomListsContainer>
        );
      })}
    </BottomDashboardMainPageMainDivBox>
  );
};

export default BottomDashboardMainPage;

import React from "react";
import styled from "styled-components";
import DonutsContainer from "./Donuts/DonutsContainer";

import BarsContainer from "./Bras/BarsContainer";

const BottomListsContainerMainDivBox = styled.div``;

const BottomListsContainer = ({ type }) => {
  const data = [
    {
      id: "CLT",
      label: "CLT",
      value: 58820,
      SumValue: 67686,
      color: "#8BC34A",
    },
    {
      id: "MBT",
      label: "MBT",
      value: 3000,
      SumValue: 67686,
      color: "#2196F3",
    },
    {
      id: "Storage",
      label: "Storage",
      value: 1385,
      SumValue: 67686,
      color: "#F44336",
    },
    {
      id: "DC/Module",
      label: "DC/Module",
      value: 1176,
      SumValue: 67686,
      color: "#FF9800",
    },
  ];
  const typeRendering = () => {
    switch (type) {
      case "Donuts":
        return <DonutsContainer data={data}></DonutsContainer>;
      case "Bars":
        return <BarsContainer></BarsContainer>;
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

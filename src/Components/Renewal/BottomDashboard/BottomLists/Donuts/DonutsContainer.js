import { ResponsivePie } from "@nivo/pie";
import React from "react";
import styled from "styled-components";
import DonutsGraph from "./DonutsGraph";
import BarGraph from "./BarGraphContainer";
import BarGraphContainer from "./BarGraphContainer";

const DonutsContainerMainDivBox = styled.div`
  height: 100%;
  width: 840px;
  /* min-width: 1100px; */
  height: calc(100vh - 450px);
  background-color: #fff;
  border-radius: 10px;
  border: 0.5px solid #e7e6e6;
  position: relative;
  .MilliContainer {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .MainContainers {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    height: 100%;
    .Left {
      width: 50%;
      height: 100%;
    }
    .Right {
      width: 50%;
      height: 100%;
    }
  }
`;

const DonutsContainer = ({ data, bottomData, formData }) => {
  return (
    <DonutsContainerMainDivBox>
      <div className="MainContainers">
        <div className="Left">
          <h4
            style={{
              fontWeight: "550",
              marginLeft: "20px",
              marginTop: "20px",
              fontSize: "21px",
            }}
          >
            설비별 수주액
          </h4>

          <DonutsGraph data={data}></DonutsGraph>
        </div>
        <div className="Right">
          <BarGraphContainer
            data={data.filter((list) => list.value !== 0)}
            BarData={bottomData.find((list) => list.type === "Bars").data}
            formData={formData}
          ></BarGraphContainer>
        </div>
      </div>
    </DonutsContainerMainDivBox>
  );
};

export default DonutsContainer;

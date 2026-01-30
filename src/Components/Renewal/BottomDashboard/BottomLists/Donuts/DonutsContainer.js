import { ResponsivePie } from "@nivo/pie";
import React from "react";
import styled from "styled-components";
import DonutsGraph from "./DonutsGraph";
import BarGraph from "./BarGraphContainer";
import BarGraphContainer from "./BarGraphContainer";

const DonutsContainerMainDivBox = styled.div`
  height: 100%;
  width: 95%;
  /* min-width: 1100px; */
  height: calc(100vh - 450px);
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid darkgray;
  .MainContainers {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    height: 100%;
    .Left {
      width: 60%;
      height: 100%;
    }
    .Right {
      width: 40%;
      height: 100%;
    }
  }
`;

const DonutsContainer = ({ data }) => {
  return (
    <DonutsContainerMainDivBox>
      <div className="MainContainers">
        <div className="Left">
          <h4
            style={{
              fontWeight: "550",
              marginLeft: "20px",
              marginTop: "20px",
              fontSize: "1.4em",
            }}
          >
            Orders By Segment
          </h4>

          <DonutsGraph data={data}></DonutsGraph>
        </div>
        <div className="Right">
          <h4
            style={{
              fontWeight: "550",
              marginRight: "20px",
              marginTop: "20px",
              fontSize: "1.1em",
              textAlign: "end",
            }}
          >
            (KRW Million)
          </h4>
          <BarGraphContainer data={data}></BarGraphContainer>
        </div>
      </div>
    </DonutsContainerMainDivBox>
  );
};

export default DonutsContainer;

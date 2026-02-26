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
  position: relative;

  .LegendContainer {
    position: absolute;
    bottom: 25px;
    display: flex;
    width: 80%;
    justify-content: space-around;
    .LegendSubContainer {
      display: flex;
      width: 100px;
      .LegendList {
        width: 100%;
        display: flex;
        align-items: center;
        width: 30px;
      }
      .LegendText {
        width: 80px;
        text-align: center;
        font-size: 13px;
      }
    }
  }
`;

const BarGraphContainer = ({ data, BarData }) => {
  return (
    <BarGraphContainerMainDivBox>
      <div className="MainContainer">
        <div className="BarsContainers">
          {data.map((list, j) => {
            return (
              <BarList
                key={list.code}
                list={list}
                ColorNumber={j}
                BarData={BarData.filter((item) => item.Segment === list.code)}
              ></BarList>
            );
          })}
        </div>
      </div>
      <div className="LegendContainer">
        <div className="LegendSubContainer">
          <div
            className="LegendList"
            // style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            {data.map((list) => {
              return (
                <div
                  style={{
                    background: list.color,
                    width: "20%",
                    height: "5px",
                  }}
                ></div>
              );
            })}
          </div>
          <div className="LegendText">Orders</div>
        </div>
        <div className="LegendSubContainer">
          <div className="LegendList">
            <div
              style={{ width: "100%", height: "5px", background: "#efefef" }}
            ></div>
          </div>
          <div className="LegendText">Revenue</div>
        </div>
      </div>
    </BarGraphContainerMainDivBox>
  );
};
export default BarGraphContainer;

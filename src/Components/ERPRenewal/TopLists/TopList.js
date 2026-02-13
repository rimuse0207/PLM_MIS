import React from "react";
import styled from "styled-components";

const TopListMainDivBox = styled.div`
  border: 1px solid lightgray;
  width: 310px;
  height: 200px;
  background-color: #fff;
  padding: 10px;
  .TitleText {
    h3 {
      font-weight: 400;
    }
  }
  .BodyText {
    text-align: center;

    h2 {
      font-size: 60px;
      line-height: 115px;
    }
  }
`;

const TopList = ({ data }) => {
  return (
    <TopListMainDivBox>
      <div className="TitleText">
        <h3>{data.title}</h3>
        <div style={{ height: "10px" }}>{data.subTitle || ""}</div>
      </div>
      <div className="BodyText">
        <h2>{data.price.toLocaleString()}</h2>
        <div style={{ fontWeight: "bolder", fontSize: "17px" }}>
          <span style={{ color: `${data.color}` }}>+{data.percent}%</span>
          <span> YoY</span>
        </div>
      </div>
    </TopListMainDivBox>
  );
};
export default TopList;

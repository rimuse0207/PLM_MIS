import React, { Fragment, useMemo, useState } from "react";
import styled from "styled-components";
import BarGraph from "./BarGraph";
import moment from "moment";
import { SegmentLists } from "../../../TopDashboard/TopLists/AverageRatio/AverageRatio";
import MCBarGraph from "./MCBarGraph";
import { IoArrowRedo } from "react-icons/io5";

export const BarsContainerMainDivBox = styled.div`
  height: 100%;
  width: 840px;
  /* min-width: 800px; */
  height: calc(100vh - 450px);
  background-color: #fff;
  border-radius: 10px;

  padding: 10px;
  color: #4d4d4d;
  select {
    height: 40px;
    padding-left: 10px;
    font-weight: 400;
    font-size: 21px;
  }
  .GraphsContainersCount {
    position: relative;

    .LegendContainer {
      position: absolute;

      width: 100%;
      left: 20px;
      z-index: 10;

      .LegendBox {
        display: flex;
        flex-wrap: wrap;
        margin-right: 30px;
        .LegendColors {
          width: 70px;
          /* background-color: #0000ff; */
          height: 25px;
          margin-right: 10px;
          text-align: center;
          line-height: 25px;
          font-weight: bolder;
        }
        .LegendText {
          display: inline-block;
          font-weight: 600;
          text-align: start;
          font-size: 15px;
        }
      }
    }
  }

  .SegmentClickButtonContainer {
    display: flex;
    justify-content: space-between;
    select {
      margin-right: 10px;
      border: 2px solid lightgray;
      border-radius: 10px;
      color: #4d4d4d;
    }
    span {
      font-size: 21px;
      font-weight: 400;
    }
    .IconsBox {
      width: 60px;
      height: 30px;
      background-color: lightgray;
      border-radius: 5px;
      text-align: center;
      font-size: 30px;
      &:hover {
        cursor: pointer;
      }
      svg {
        color: white;
      }
    }
  }
`;

const BarsContainer = ({ data }) => {
  const [SelectBarTitle, setSelectBarTitle] = useState(
    "AverageMCRatioBySegment",
  );
  const [SelectBarSegment, setSelectBarSegment] = useState("all");

  const filteringData = (selectData) => {
    switch (SelectBarTitle) {
      case "CLT": {
        return [...selectData]
          .filter((item) => item.EXPC_SEL_PRICE != null)
          .filter((item) => item.Segment === "CLT")
          .sort(
            (a, b) =>
              moment(b.ProductCreactDate).valueOf() -
              moment(a.ProductCreactDate).valueOf(),
          );
      }
      case "LatestOrders5": {
        return [...selectData]
          .filter((item) => item.ProductCreactDate)
          .sort(
            (a, b) =>
              moment(b.ProductCreactDate).valueOf() -
              moment(a.ProductCreactDate).valueOf(),
          )
          .slice(0, 5);
      }
      case "MCRatioTop5": {
        return [...selectData]
          .filter((item) => item.MCRate != null)
          .sort((a, b) => b.MCRate - a.MCRate)
          .slice(0, 5);
      }
      case "MCRatioBottom5": {
        return [...selectData]
          .filter((item) => item.MCRate != null)
          .sort((a, b) => a.MCRate - b.MCRate)
          .slice(0, 5);
      }
      default:
        return "";
    }
  };

  const filterSegmentData = (selectData, segements) => {
    return [...selectData]
      .filter((item) => item.EXPC_SEL_PRICE != null)
      .sort(
        (a, b) =>
          moment(b.ProductCreactDate).valueOf() -
          moment(a.ProductCreactDate).valueOf(),
      );
  };

  const SegmentfilteredData = useMemo(() => {
    if (SelectBarSegment === "all") return data;
    return data.filter((item) => item.Segment === SelectBarSegment);
  }, [data, SelectBarSegment]);

  const MakingAverage = (MCData) => {
    if (!MCData.length) return 0;
    return (
      Math.round(
        MCData.reduce((sum, item) => sum + item.MCRate, 0) / MCData.length,
      ) || 0
    );
  };

  const MakingMCGraphData = useMemo(() => {
    return SegmentLists.map((list) => {
      return {
        ...list,
        MCRate: MakingAverage(
          data.filter((item) => item.Segment === list.code),
        ),
      };
    });
  }, [data, SelectBarSegment]);

  return (
    <BarsContainerMainDivBox>
      <div>
        {SelectBarTitle !== "AverageMCRatioBySegment" ? (
          <div className="SegmentClickButtonContainer">
            <div>
              <select
                style={{ marginLeft: "20px" }}
                value={SelectBarSegment}
                onChange={(e) => setSelectBarSegment(e.target.value)}
              >
                {/* <option value="all">Total</option> */}
                {SegmentLists.map((list) => {
                  return (
                    <option value={list.code} key={list.code}>
                      {list.label}
                    </option>
                  );
                })}
              </select>
              <span>MC율</span>
            </div>
            <div
              className="IconsBox"
              onClick={() => {
                setSelectBarTitle("AverageMCRatioBySegment");
              }}
            >
              <IoArrowRedo />
            </div>
          </div>
        ) : (
          <div
            style={{
              fontWeight: "400",
              fontSize: "21px",
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            설비별 평균 MC율
          </div>
        )}
      </div>
      <div style={{ height: "100%" }} className="GraphsContainersCount">
        {SelectBarTitle === "AverageMCRatioBySegment" ? (
          <MCBarGraph
            data={MakingMCGraphData}
            setSelectBarSegment={(data) => setSelectBarSegment(data)}
            setSelectBarTitle={(data) => setSelectBarTitle(data)}
          />
        ) : (
          <Fragment>
            <BarGraph data={filterSegmentData(SegmentfilteredData)}></BarGraph>
            <div>
              <ul
                className="LegendContainer"
                style={{
                  bottom:
                    filterSegmentData(SegmentfilteredData).length > 6
                      ? "80px"
                      : "72px",
                }}
              >
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{ backgroundColor: "#ddddff" }}
                    >
                      판가
                    </div>
                    {/* <div className="LegendText">Price</div> */}
                  </div>
                </li>
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{
                        backgroundColor: "#0000ff",
                        color: "#fff",
                        marginTop: "2px",
                      }}
                    >
                      MC
                    </div>
                    {/* <div className="LegendText">MC</div> */}
                  </div>
                </li>
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </BarsContainerMainDivBox>
  );
};

export default BarsContainer;

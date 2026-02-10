import React, { Fragment, useMemo, useState } from "react";
import styled from "styled-components";
import BarGraph from "./BarGraph";
import moment from "moment";
import { SegmentLists } from "../../../TopDashboard/TopLists/AverageRatio/AverageRatio";
import MCBarGraph from "./MCBarGraph";

export const BarsContainerMainDivBox = styled.div`
  height: 100%;
  width: 803px;
  /* min-width: 800px; */
  height: calc(100vh - 450px);
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid darkgray;
  padding: 10px;

  select {
    height: 40px;
    padding-left: 10px;
    font-weight: 400;
    font-size: 21px;
  }
  .GraphsContainersCount {
    position: relative;

    .LegendContainer {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 50px;
      width: 100%;
      .LegendBox {
        display: flex;
        flex-wrap: wrap;
        width: 200px;
        .LegendColors {
          width: 80px;
          /* background-color: #0000ff; */
          height: 17px;
          border-radius: 100px;
          margin-right: 10px;
        }
        .LegendText {
          width: 100px;
          font-weight: 600;
          text-align: start;
        }
      }
    }
  }
`;

const BarsContainer = ({ data }) => {
  const [SelectBarTitle, setSelectBarTitle] = useState("SellingPriceTop5");
  const [SelectBarSegment, setSelectBarSegment] = useState("all");

  const filteringData = (selectData) => {
    switch (SelectBarTitle) {
      case "SellingPriceTop5": {
        return [...selectData]
          .filter((item) => item.EXPC_SEL_PRICE != null)
          .sort((a, b) => b.EXPC_SEL_PRICE - a.EXPC_SEL_PRICE)
          .slice(0, 5);
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
        <select
          style={{ width: "350px" }}
          value={SelectBarTitle}
          onChange={(e) => setSelectBarTitle(e.target.value)}
        >
          <option value="SellingPriceTop5">Selling Price Top 5</option>
          <option value="AverageMCRatioBySegment">
            Average MC Ratio By Segment{" "}
          </option>
          <option value="LatestOrders5">Latest Orders 5</option>
          <option value="MCRatioTop5">MC Ratio Top 5</option>
          <option value="MCRatioBottom5">MC Ratio Bottom 5</option>
        </select>

        {SelectBarTitle !== "AverageMCRatioBySegment" ? (
          <select
            style={{ marginLeft: "20px" }}
            value={SelectBarSegment}
            onChange={(e) => setSelectBarSegment(e.target.value)}
          >
            <option value="all">Total</option>
            {SegmentLists.map((list) => {
              return (
                <option value={list.code} key={list.code}>
                  {list.label}
                </option>
              );
            })}
          </select>
        ) : (
          <></>
        )}
      </div>
      <div style={{ height: "100%" }} className="GraphsContainersCount">
        {SelectBarTitle === "AverageMCRatioBySegment" ? (
          <MCBarGraph data={MakingMCGraphData} />
        ) : (
          <Fragment>
            <BarGraph data={filteringData(SegmentfilteredData)}></BarGraph>
            <div>
              <ul className="LegendContainer">
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{ backgroundColor: "rgb(0,0,255,0.6)" }}
                    ></div>
                    <div className="LegendText">Price</div>
                  </div>
                </li>
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{ backgroundColor: "#0000ff" }}
                    ></div>
                    <div className="LegendText">MC</div>
                  </div>
                </li>
                <li>
                  <div className="LegendBox">
                    <div
                      className="LegendColors"
                      style={{ backgroundColor: "#FFC400" }}
                    ></div>
                    <div className="LegendText">MC Ratio (%)</div>
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

import React from "react";
import styled from "styled-components";
import Donuts from "./Donuts/Donuts";

const BottomSubListMainDivBox = styled.div`
  border: 1px solid lightgray;
  width: 310px;
  height: 500px;
  background-color: #fff;
  padding: 10px;
  margin-top: 50px;
`;

const BottomSubList = () => {
  const data = [
    {
      id: "Analog Devices",
      label: "Analog Devices",
      value: 10315,
      color: "rgb(50, 85, 235)",
    },
    {
      id: "SAMTEC",
      label: "SAMTEC",
      value: 6315,
      color: "rgb(50, 85, 235,0.5)",
    },
    {
      id: "ELTEK",
      label: "ELTEK",
      value: 1315,
      color: "rgb(50, 85, 235,0.2)",
    },
    {
      id: "Others",
      label: "Others",
      value: 815,
      color: "lightgray",
    },
  ];
  return (
    <BottomSubListMainDivBox>
      <div>
        <h4>Top 3 Suppliers'</h4>
        <div>Total</div>
        <div>
          <Donuts data={data}></Donuts>
        </div>
        <div>
          <div>
            <ul
              style={{
                display: "flex",
                flexFlow: "wrap",
                justifyContent: "space-between",
                padding: "0px 20px",
              }}
            >
              {data.map((list) => {
                return (
                  <li style={{ width: "43%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "10px",
                          height: "20px",
                          backgroundColor: `${list.color}`,
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      ></div>
                      <div style={{ fontSize: "13px", fontWeight: "bolder" }}>
                        {" "}
                        {list.label}
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "end",
                        marginTop: "10px",
                        marginBottom: "10px",
                        fontWeight: "bolder",
                      }}
                    >
                      {list.value.toLocaleString()}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </BottomSubListMainDivBox>
  );
};

export default BottomSubList;

import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const InfoContainerMainDivBox = styled.div`
    height: 20vh;
    border: 1px solid lightgray;
    box-shadow: -8px 8px 3px -5px lightgray;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .Select_Line {
        height: 3px;
        background-color: rgb(0, 202, 255);
    }
    .Info_Container {
        display: flex;
        height: 100%;
        .Info_Container_Left {
            width: 60%;
            padding-left: 20px;

            h2 {
                font-size: 3em;
                margin-top: 10px;
            }
        }
        .Info_Container_Right {
            width: 40%;
            font-size: 1.2em;
            font-weight: bolder;
            line-height: 40px;
            height: 100%;

            ul {
                display: flex;
                flex-flow: column;
                height: 100%;
                justify-content: space-around;

                li {
                    list-style: square;
                    width: 100%;
                }
            }
        }
    }
`;

const InfoContainer = () => {
    const { Groups_Code } = useParams();
    return (
        <InfoContainerMainDivBox>
            <div className="Select_Line"></div>
            <div className="Info_Container">
                <div className="Info_Container_Left">
                    <h2>{Groups_Code === 'Modules' ? 'DC/Module' : Groups_Code}</h2>
                    <select>
                        <option>전체</option>
                        <option>S3000P</option>
                        <option>S1610</option>
                        <option>S810</option>
                        <option>i1520</option>
                    </select>
                </div>
                <div className="Info_Container_Right">
                    <ul>
                        <li>당해 매출액 : 1,640,000,000 원</li>
                        <li>평균 MC 율 : 55.5%</li>
                        <li>
                            <div>
                                주요 거래처 :{' '}
                                <span style={{ fontSize: '0.8em', fontWeight: '300' }}>삼성전자(주), SK하이닉스(주), SIB</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </InfoContainerMainDivBox>
    );
};

export default InfoContainer;

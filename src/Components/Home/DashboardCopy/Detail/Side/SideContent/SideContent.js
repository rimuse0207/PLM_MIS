import React from 'react';
import styled from 'styled-components';

const SideContentMainDivBox = styled.div`
    padding: 10px;

    .summation_Table {
        margin-top: 20px;
        margin-bottom: 20px;
        table {
            width: 70%;
        }
    }
    .Detail_Table {
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        th,
        td {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
            color: black;
        }
    }
`;

const SideContent = () => {
    return (
        <SideContentMainDivBox>
            <div>
                <h2>매출내역</h2>
            </div>
            <div className="summation_Table">
                <table>
                    <tbody>
                        <tr>
                            <td>1. </td>
                            <td>S1610</td>
                            <td>3건</td>
                            <td>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(530000000)}</td>
                        </tr>
                        <tr>
                            <td>2. </td>
                            <td>S3000P</td>
                            <td>3건</td>
                            <td>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(530000000)}</td>
                        </tr>
                        <tr>
                            <td>3. </td>
                            <td>i5120</td>
                            <td>3건</td>
                            <td>{new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(530000000)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="Detail_Table">
                <table>
                    <thead>
                        <tr>
                            <th>거래일</th>
                            <th>모델명</th>
                            <th>호기</th>
                            <th>판가</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>5.27</td>
                            <td>S1610</td>
                            <td>3</td>
                            <td>200,000,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SideContentMainDivBox>
    );
};

export default SideContent;

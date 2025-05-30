import React, { useEffect, useState } from 'react';
import NavigationMainPage from '../../Navigation/NavigationMainPage';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Request_Get_Axios } from '../../../API';
import BomTree from './BomTree/BomTree';
import Loader from '../../../Loader/Loader';

const BomListsMainPageMainDivBox = styled.div`
    border: 1px solid black;

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
    }

    th,
    td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        color: black;
    }
`;

const BomListsMainPage = () => {
    const { Type, Model_Name, FSC_CODE, EQ_NO } = useParams();
    const [Bom_Lists, setBom_Lists] = useState([]);
    const [Loadings, setLoadings] = useState(false);

    useEffect(() => {
        Making_BOM_Tree_For_Using_WebSite_Func();
    }, [Type, Model_Name, FSC_CODE, EQ_NO]);
    const Making_BOM_Tree_For_Using_WebSite_Func = async () => {
        setLoadings(true);
        const Making_BOM_Tree_For_Using_WebSite_Axios = await Request_Get_Axios(
            '/PLM_Route/PLM_Dashboard/Making_BOM_Tree_For_Using_WebSite',
            {
                Type,
                Model_Name,
                FSC_CODE,
                EQ_NO,
            }
        );
        console.log(Making_BOM_Tree_For_Using_WebSite_Axios);
        if (Making_BOM_Tree_For_Using_WebSite_Axios.status) {
            setBom_Lists(Making_BOM_Tree_For_Using_WebSite_Axios.data);
        }
        setLoadings(false);
    };

    return (
        <BomListsMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <div>
                {Model_Name} {FSC_CODE}의 BOM 정보{' '}
            </div>
            <div>
                <div style={{ padding: '20px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Part NO.</th>
                                <th>QTY</th>
                                <th>단가</th>
                                <th>총가격</th>
                                <th>assyGbnNm</th>
                                <th>itemGrpNm</th>
                                <th>partNm</th>
                                <th>partSpec</th>
                                <th>partTypePlmNm</th>
                                <th>procNm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Bom_Lists.map(list => {

                                return <BomTree key={list.ERP_PART} list={list}></BomTree>;
                            })} */}
                            {Bom_Lists.map((list, j) => {
                                return (
                                    <tr>
                                        <td style={{ paddingLeft: `${10 * (list.level + 1)}px` }}>{list.ERP_PART}</td>
                                        <td>{list.Part_Qty} ea</td>
                                        <td>{Math.ceil(list.Purchase_price).toLocaleString('ko-KR')} 원</td>
                                        <td>{Math.ceil(list.Purchase_price * Number(list.Part_Qty)).toLocaleString('ko-KR')} 원</td>
                                        <td>{list.assyGbnNm}</td>
                                        <td>{list.itemGrpNm}</td>
                                        <td>{list.partNm}</td>
                                        <td>{list.partSpec}</td>
                                        <td>{list.partTypePlmNm}</td>
                                        <td>{list.procNm}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Loader loading={Loadings}></Loader>
        </BomListsMainPageMainDivBox>
    );
};

export default BomListsMainPage;

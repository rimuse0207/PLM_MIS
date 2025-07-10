import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../../../Navigation/NavigationMainPage';
import TopContainer from './Top/TopContainer';
import SideContainer from './Side/SideContainer';
import { Request_Get_Axios } from '../../../../API';
import * as XLSX from 'xlsx/xlsx.mjs';

const DetailMainPageMainDivBox = styled.div`
    .Detail_Group {
        background-color: #efefef;
        &::after {
            content: '';
            clear: both;
            display: block;
        }
        .Detail_Left {
            width: 68%;
            height: calc(100vh - 80px);

            float: left;
            margin-left: 10px;
        }
        .Detail_Right {
            width: 30%;
            height: calc(100vh - 80px);

            float: right;
            margin-right: 10px;
        }
    }
`;

const DetailMainPage = () => {
    // const [adad, setadad] = useState([]);
    // useEffect(() => {
    //     Getting_BOM_Lists();
    // }, []);

    // const Getting_BOM_Lists = async () => {
    //     const Gettig = await Request_Get_Axios('/PLM_Route/PLM_Dashboard/specific_Equipment_Mc_Calculate');
    //     console.log(Gettig);
    //     setadad(Gettig.data);
    // };
    // const Getting_Excel = async () => {
    //     exportToExcel();
    // };

    // const exportToExcel = () => {
    //     const workbook = XLSX.utils.book_new();

    //     const filteredParts = adad.filter(part => part.ERP_PART.startsWith('R'));

    //     if (filteredParts.length > 0) {
    //         const worksheet = XLSX.utils.json_to_sheet(filteredParts);
    //         XLSX.utils.book_append_sheet(workbook, worksheet, `i7304C 2호기`);
    //     }

    //     XLSX.writeFile(workbook, `7304C.xlsx`);
    // };
    return (
        <DetailMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <div className="Detail_Group">
                <div className="Detail_Left">
                    <TopContainer></TopContainer>
                </div>
                <div className="Detail_Right">
                    <SideContainer></SideContainer>
                </div>
            </div>
        </DetailMainPageMainDivBox>
    );
};

export default DetailMainPage;

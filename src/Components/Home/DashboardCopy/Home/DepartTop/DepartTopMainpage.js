import React, { useEffect, useState } from 'react';
import DepartLists from './DepartLists/DepartLists';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../../API';

const DepartTopMainPageMainDivBox = styled.div`
    .Select_Line {
        margin-top: 20px;
        height: 4px;
        background-color: rgb(0, 202, 255);
        position: relative;
        .Line_Title {
            background-color: #fff;
            position: absolute;
            top: -15px;
            font-size: 1.5em;
            font-weight: bolder;
            padding-left: 15px;
            padding-right: 15px;
            left: 35px;
        }
    }
    .Top_Depart_Lists_GR {
        display: flex;
        justify-content: space-around;
    }
`;

const DepartTopMainPage = () => {
    const [DepartMentLists, setDepartMentLists] = useState([
        {
            Department_Name: 'DC/Module',
            Department_code: 'Modules',
            equipment_Lists: ['S810', 'S1610', 'S3000P', 'i1000', 'i1520'],
            price: 14.2,
            sell_price: 38,
        },
        {
            Department_Name: 'MBT',
            Department_code: 'MBT',
            equipment_Lists: ['i2122H', 'i2154H'],
            price: 344.8,
            sell_price: 740,
        },
        {
            Department_Name: 'Storage',
            Department_code: 'Storage',
            equipment_Lists: ['i3930KA', 'SST12KA', 'SST12KF', 'SST12KFQ THB', 'SST32KF', 'SST32KF THB', 'SST64KA'],
            price: 766,
            sell_price: 1560,
        },
        {
            Department_Name: 'SoC',
            Department_code: 'SoC',
            equipment_Lists: ['I9950CP', 'EX9950C', 'EX9950D'],
            price: 336.2,
            sell_price: 564,
        },
        {
            Department_Name: 'CLT',
            Department_code: 'CLT',
            equipment_Lists: ['I7304C'],
            price: 6119,
            sell_price: 8240,
        },
    ]);

    return (
        <DepartTopMainPageMainDivBox>
            <div className="Select_Line">
                <div className="Line_Title">최근판매제품 MC</div>
            </div>
            <ul className="Top_Depart_Lists_GR">
                {DepartMentLists.map(list => {
                    return <DepartLists key={list.Department_Name} list={list}></DepartLists>;
                })}
            </ul>
        </DepartTopMainPageMainDivBox>
    );
};

export default DepartTopMainPage;

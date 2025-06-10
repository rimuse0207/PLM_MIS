import React, { useState } from 'react';
import DepartLists from './DepartLists/DepartLists';
import styled from 'styled-components';

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
        },
        {
            Department_Name: 'MBT',
            Department_code: 'MBT',
            equipment_Lists: ['i2122H', 'i2154H'],
        },
        {
            Department_Name: 'Storage',
            Department_code: 'Storage',
            equipment_Lists: ['i3930KA', 'SST12KA', 'SST12KF', 'SST12KFQ THB', 'SST32KF', 'SST32KF THB', 'SST64KA'],
        },
        {
            Department_Name: 'SoC',
            Department_code: 'SoC',
            equipment_Lists: ['I9950CP', 'EX9950C', 'EX9950D'],
        },
        {
            Department_Name: 'CLT',
            Department_code: 'CLT',
            equipment_Lists: ['I7304C'],
        },
    ]);
    return (
        <DepartTopMainPageMainDivBox>
            <div className="Select_Line">
                <div className="Line_Title">부문별 판가 대비 MC 평균</div>
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

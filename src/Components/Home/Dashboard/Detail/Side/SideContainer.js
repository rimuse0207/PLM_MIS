import React from 'react';
import SideContent from './SideContent/SideContent';
import styled from 'styled-components';
import SideContentPartListsTable from './SideContent/SideContentPartListsTable';

const SideContainerMainDivBox = styled.div`
    border: 1px solid lightgray;
    height: 99%;
    box-shadow: -8px 8px 3px -5px lightgray;
    background-color: #fff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .Select_Line {
        height: 3px;
        background-color: rgb(0, 202, 255);
    }
`;

const SideContainer = ({ Detail_Department_Lists, DepartMentLists, Selector_Value }) => {
    return (
        <SideContainerMainDivBox>
            <div className="Select_Line"></div>
            {Selector_Value === 'ALL' ? (
                <SideContent
                    Detail_Department_Lists={Detail_Department_Lists}
                    DepartMentLists={DepartMentLists}
                    Selector_Value={Selector_Value}
                ></SideContent>
            ) : (
                <SideContentPartListsTable
                    Detail_Department_Lists={Detail_Department_Lists}
                    DepartMentLists={DepartMentLists}
                    Selector_Value={Selector_Value}
                ></SideContentPartListsTable>
            )}
        </SideContainerMainDivBox>
    );
};

export default SideContainer;

import React, { useEffect, useState } from 'react';
import InfoContainer from './InfoContainer/InfoContainer';
import BarContainer from './BarContainer/BarContainer';

const TopContainer = ({ DepartMentLists, Selector_Value, setSelector_Value, Detail_Department_Lists }) => {
    return (
        <div style={{ height: '100%' }}>
            <InfoContainer
                DepartMentLists={DepartMentLists}
                Detail_Department_Lists={Detail_Department_Lists}
                Selector_Value={Selector_Value}
                setSelector_Value={data => setSelector_Value(data)}
            ></InfoContainer>
            {/* <BarContainer></BarContainer> */}
        </div>
    );
};

export default TopContainer;

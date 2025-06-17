import React from 'react';
import InfoContainer from './InfoContainer/InfoContainer';
import BarContainer from './BarContainer/BarContainer';

const TopContainer = () => {
    return (
        <div style={{ height: '100%' }}>
            <InfoContainer></InfoContainer>
            <BarContainer></BarContainer>
        </div>
    );
};

export default TopContainer;

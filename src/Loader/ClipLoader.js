import React from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

const ClipLoaderMainPageMainDivBox = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClipLoaders = ({ loading }) => {
    return (
        <ClipLoaderMainPageMainDivBox>
            <div className="sweet-loading">
                <ClipLoader color={'#0a0ef3'} loading={loading} size={70} />
            </div>
        </ClipLoaderMainPageMainDivBox>
    );
};

export default ClipLoaders;

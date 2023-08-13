import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--primary);
    color: var(--primary);
  }
  50% {
    box-shadow: 0 0 20px 10px var(--primary);
    color: var(--primary);
  }
  100% {
    box-shadow: 0 0 0 0 var(--primary);
    color: var(--primary);
  }
`;

const LoadingText = styled.h2`
    font-size: 24px;
    color: var(--primary);
    animation: ${loadingAnimation} 1.5s infinite;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Loading = () => {
    return <LoadingText className="flex">Loading...</LoadingText>;
};

export default Loading;

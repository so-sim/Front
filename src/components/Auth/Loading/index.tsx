import React from 'react';
import Lottie from 'react-lottie-player';
import LoadingLottie from '@/assets/lottie/loading.json';
import styled from '@emotion/styled';

const Loading = () => {
  return (
    <Contianer>
      <Lottie loop animationData={LoadingLottie} play style={{ width: '248px', height: '248px' }} />
    </Contianer>
  );
};

export default Loading;

const Contianer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

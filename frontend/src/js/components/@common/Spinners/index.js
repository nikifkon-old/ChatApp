import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ContentGrid } from '../../../styles'

const scale = keyframes`
  0% {
    height: 30px;
  }
  100% {
    height: 50px;
  }
`;

const AnimatedSpinner = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  margin: 100px auto;
  & > div {
    margin: 5px;
    width: 13px;
    height: 30px;
    background: ${props => props.theme.color.text.primary};
    animation: ${scale} .3s infinite alternate;
  }
  & > div:nth-child(1) {
    animation-delay: 0;
  }
  & > div:nth-child(2) {
    animation-delay: calc(.5s/3);
  }
  & > div:nth-child(3) {
    animation-delay: calc(2 * (.5s/3));
  }
`;

function Spinner() {
  return (
    <ContentGrid
     container
    >
      <AnimatedSpinner>
        <div />
        <div />
        <div />
      </AnimatedSpinner>
    </ContentGrid>
  );
}

export default Spinner;

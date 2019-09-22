import React from 'react'
import styled from 'styled-components'
import { dark_cont } from '../../styles'

const AnimatedSpinner = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  & > div {
    margin: 5px;
    width: 13px;
    height: 30px;
    background: ${dark_cont};
    animation: scale .3s infinite alternate;
  }
  & > div:nth-child(1) {
    animation-delay: 0
  }
  & > div:nth-child(2) {
    animation-delay: calc(.5s/3)
  }
  & > div:nth-child(3) {
    animation-delay: calc(2 * (.5s/3))
  }
  @keyframes scale {
    0% {
      height: 30px
    }
    100% {
      height: 50px
    }
  }
`

const Spinner = () => {
  return (
    <AnimatedSpinner>
      <div></div>
      <div></div>
      <div></div>
    </AnimatedSpinner>
  )
}

export default Spinner

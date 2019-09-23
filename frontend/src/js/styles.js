import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import { Button, Grid } from '@material-ui/core'

export const bgColor = "#fff"
export const dark_bg1 = "#0E1621"
export const dark_bg2 = "#182533"
export const dark_bg3 = "#202B36"
export const dark_active = "#2B5278"
export const dark_cont = "#fff"
export const dark_cont1 = "#383f47"
export const dark_cont2 = "#ccc"

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    background: ${bgColor};
  }

  a {
    text-decoration: none
  }

  img {
      margin: 0 auto
  }
`

export const Wrapper = styled.div`
  display: flex
  flex-direction: column
  min-height: 100vh
`

export const PageContainer = styled(({menuisopen, ...props}) => <Grid {...props} />)`
  margin-top: ${props => props.menuisopen ? '50px' : '0px'}
  background: ${props => props.background || bgColor}
  flex: 1
  transition: .3s ease-out 0s margin-top;
`

export const Footer = styled(Grid)`

`

export const SectionContainer = styled(Grid)`
  margin: ${props => props.horizontal_center === "true" ? 'auto auto' : '0 auto'}
  max-width: 800px
  background: ${props => props.background || 'inherit'}
`

export const ContentGrid = styled(Grid)`
  background: ${props => props.background || 'inherit'}
`

export const Content = styled.div`
  max-width: 600px
  box-sizing: border-box
  text-align: ${props => props.center ? 'center' : ';'}
  background: ${props => props.background || 'inherit'}

  ${css`
    ${props => props.grid_left ? 'margin-right: auto' : ''}
    ${props => props.grid_right ? 'margin-left: auto' : ''}
    ${props => props.noMargin ? 'margin: 0' : ''}
    ${props => props.marginAuto ? 'margin: 0 auto' : ''}
  `}

  padding: ${props => props.paddingDesctop || '2% 5%'}
  width: ${props => props.fullWidth ? '100%' : ';'}
  @media(max-width: 768px) {
    padding: ${props => props.paddingDesctop || '2% 5%'}
  }
`

export const AppContainer = styled.div`
  width: 100%;
  min-height: ${props =>
    props.menuisopen
      ? "calc(100vh - 50px)"
      : "100vh"
    };
  display: grid;
  grid-template-columns: 40px .8fr 1.3fr 550px 1fr;
  transition: .3s ease-out 0s min-height;
`

export const StyledForm = styled.form`
  width: 600px
  @media(max-width: 768px){
    width: 100%
  }
`

export const Img = styled.img`
  border-radius: ${props => props.round ? '50%' : ';'}
`

export const Btn = styled(
    ({color, primary, ...props}) => <Button {...props} />
  )`
  width: ${props => props.width || '100%'};
  color: ${props => props.color || 'inherit'};
  ${css`
    ${props => props.background
      && `background: ${props.background};`
    }
    ${props => props.primary
      && `
        background: ${dark_active};
        color: ${dark_cont};
      `
    }
  `}
  margin: 10px auto;
  &:hover {
    background: ${dark_active};
    color: ${dark_cont};
  }
`

export const H1 = styled.h1`
  color: ${props => props.color || ";"}
  font-size: 20px
  line-height: 1rem
`

export const H4 = styled.h4`
  color: ${props => props.color || ";"}
  font-size: 16px
  line-height: 1rem
`

export const P = styled.p`
  color: ${props => props.color || "inherit"};
  text-align: ${props => props.center ? 'center' : ''};
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : ''};
  line-height: 20px;
  ${css`
    ${props => props.grid_left ? 'margin-right: auto;' : ''}
    ${props => props.grid_right ? 'margin-left: auto;' : ''}
    ${props => props.noMargin ? 'margin: 0;' : ''}
  `}
`

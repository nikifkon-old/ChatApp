import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import { Button, Grid } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const bgColor = "#fff"
const dark_bg1 = "#1d232a"
const dark_bg2 = "#282f37"
const dark_bg3 = "#343c45"
const dark_cont1 = "#383f47"
const dark_cont2 = "#909498"

const MuiTheme = createMuiTheme({
    overrides: {
        MuiButtonBase: {
            root: {
              margin: "",
              backgroundColor: "",
            }
        },
        MuiIconButton: {
          root: {
            color: "unset",
            backgroundColor: "#0000"
          }
        }
    }
})

const GlobalStyle = createGlobalStyle`
    html, body {
      margin: 0
      padding: 0
      font-family: 'Nunito', sans-serif;
      background: ${bgColor}
    }

    a {
      text-decoration: none
    }

    img {
        margin: 0 auto
    }
`

const Wrapper = styled.div`
    display: flex
    flex-direction: column
    min-height: 100vh
`

const PageContainer = styled(({menuisopen, ...props}) => <Grid {...props} />)`
  margin-top: ${props => props.menuisopen ? '50px' : '0px'}
  background: ${props => props.background || bgColor}
  flex: 1
  transition: .3s ease-out 0s margin-top;
`

const Header = styled.nav`
  display: flex
  width: 100%
  box-sizing: border-box
  justify-content: space-evenly
  align-items: center
  position: absolute
  top: ${props => props.show ? '0' : '-50px'}
  z-index: 9
  height: 50px
  background: ${dark_bg1}
  transition: .3s ease-out 0s top;
`
const Footer = styled(Grid)`

`

const SectionContainer = styled(Grid)`
  margin: ${props => props.horizontal_center === "true" ? 'auto auto' : '0 auto'}
  max-width: 800px
  background: ${props => props.background || 'inherit'}
`

const ContentGrid = styled(Grid)`
  background: ${props => props.background || 'inherit'}
`

const Content = styled.div`
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

const AppContainer = styled.div`
  width: 100%
  min-height: ${props => props.menuisopen ? "calc(100vh - 50px);" : "100vh;"}
  display: flex
  transition: .3s ease-out 0s min-height;
`

const StyledForm = styled.form`
  width: 600px
  @media(max-width: 768px){
    width: 100%
  }
`

const Img = styled.img`
  border-radius: ${props => props.round ? '50%' : ';'}
`

const Btn = styled(Button)`
  width: ${props => props.width || '300px'}
  background: ${props => props.background || '#0000'}
  margin: 10px auto
`

const H1 = styled.h1`
  color: ${props => props.color || ";"}
  font-size: 20px
  line-height: 1rem
`

const P = styled.p`
  color: ${props => props.color || "#000"}
  text-align: ${props => props.center ? 'center' : ';'}
  font-size: 14px
  font-weight: ${props => props.bold ? 'bold' : ';'}
  line-height: 20px
  ${css`
    ${props => props.grid_left ? 'margin-right: auto' : ''}
    ${props => props.grid_right ? 'margin-left: auto' : ''}
    ${props => props.noMargin ? 'margin: 0' : ''}
  `}
`

export {
    GlobalStyle as default,
    MuiTheme,
    Btn,
    Wrapper,
    PageContainer,
    AppContainer,
    StyledForm,
    Header,
    Footer,
    SectionContainer,
    ContentGrid,
    Content,
    Img,
    H1,
    P,
    dark_bg1,
    dark_bg2,
    dark_bg3,
    dark_cont1,
    dark_cont2,
}

import React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'
import { Button, Grid, TextField as MaterialTextField } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const bgColor = "#fff"
const primary = "#3f51b5"

const MuiTheme = createMuiTheme({
    overrides: {
        MuiButtonBase: {
            root: {
              margin: ""
            }
        },
        MuiIconButton: {
          root: {
            color: "unset"
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
  background: #000
  transition: .3s ease-out 0s top;
`
const Footer = styled(Grid)`

`

const SectionContainer = styled(Grid)`
  margin: ${props => props.horizontal_center === "true" ? 'auto auto' : '0 auto'}
  max-width: 800px
  background: ${props => props.background || bgColor}
`

const ContentGrid = styled(Grid)`
  background: ${props => props.background || bgColor}
`

const Content = styled.div`
  max-width: 600px
  box-sizing: border-box
  text-align: ${props => props.center ? 'center' : ';'}
  background: ${props => props.background || bgColor}
  margin: 0 auto
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
`

const StyledForm = styled.form`
  width: 600px
  @media(max-width: 768px){
    width: 100%
  }
`

const Btn = styled(Button)`
  width: ${props => props.width || '300px'}
  margin: 10px auto
`

const TextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
  <MaterialTextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
)

const H1 = styled.h1`
  color: ${props => props.color || ";"}
  font-size: 1.75rem
  line-height: 1.2rem
`

const P = styled.p`
  color: ${props => props.color || ";"}
  text-align: ${props => props.center ? 'center' : ';'}
  font-size: 1rem
  line-height: 1.5rem
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
    TextField,
    H1,
    P
}
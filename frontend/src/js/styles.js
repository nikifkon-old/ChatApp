import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
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

const PageContainer = styled(Grid)`
  margin-top: 50px
  background: ${props => props.background || bgColor}
  flex: 1
`

const Header = styled(Grid)`
  position: absolute
  top: 0
  z-index: 9
  height: 50px
  background: #000
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
  line-height: 2rem
`

const P = styled.p`
  color: ${props => props.color || ";"}
  font-size: 1rem
  line-height: 1.5rem
`

export {
    GlobalStyle as default,
    MuiTheme,
    Btn,
    Wrapper,
    PageContainer,
    Header,
    Footer,
    SectionContainer,
    ContentGrid,
    Content,
    TextField,
    H1,
    P
}
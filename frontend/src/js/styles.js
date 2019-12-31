import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css, createGlobalStyle } from 'styled-components'
import { Button, Grid } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

import {
  withHeaderStatus,
} from './HOC'

export const active = "#2B5278"
export const active_light = "#427eb8"
export const background_darken = "#0E1621"
export const background = "#182533"
export const background_light = "#202B36"
export const content_light = "#fff"
export const content = "#ccc"
export const content_darken = "#383f47"
export const alternative = "#000"

export const navWidth = "40px" // 40px
export const menuWidth = "12%" // 184px
export const chatsListWidth = "20.8%" // 300px
export const chatWidth = "0.997fr" // 718px
export const sidebarWidth = "calc(150px * 1.1)" // 198px

const defaultTheme = createMuiTheme()

export const theme = {
  ...defaultTheme,
  color: {
    primary: active,
    primary_light: active_light,
    background: {
      primary: background_darken,
      secondary: background,
      light: background_light
    },
    text: {
      primary: content_light,
      secondary: content,
      alternative: alternative
    },
    hr: {
      primary: content_light,
      secondary: content_darken,
      default: content
    },
    btn: {
      primary: {
        text: content_light,
        background: active
      },
      secondary: {
        text: alternative,
        background: content
      },
      default: {
        text: alternative,
        background: content_light
      } 
    }
  }
}

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    background: ${props => props.theme.color.background.primary};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    margin: 0 auto;
  }
`

export const Wrapper = styled.div`
  display: flex
  flex-direction: column
  min-height: 100vh
`

export const PageContainer = withHeaderStatus(styled(
  ({headerIsOpen, handleAppHeader, ...props}) => <Grid {...props}/>
)`
  margin-top: ${props => props.headerIsOpen ? '50px' : '0px'}
  background: ${props => props.background || props.theme.background.primary}
  flex: 1
  transition: .3s ease-out 0s margin-top;
`)

export const Footer = styled(Grid)`

`

export const SectionContainer = styled(Grid)`
  margin: ${props => props.horizontal_center === "true" ? 'auto auto' : '0 auto'}
  max-width: 800px
  background: ${props => props.background || 'inherit'}
`

export const ContentGrid = styled(Grid)`
  background: ${props => props.background || 'inherit'};
  color: ${props => props.color || 'inherit'};
`

export const Content = styled.div`
  max-width: 600px;
  height: ${props => props.height || 'unset'};
  box-sizing: border-box;
  text-align: ${props => props.center ? 'center' : ''};
  background: ${props => props.background || 'inherit'};
  color: ${props => props.color || 'inherit'};

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

export const GridItem = styled(
  ({component: Component, column, row, center, ...props}) => {
    return Component ?
      <Component {...props} />
      :
      <div {...props}/>
  }
)`
  grid-column: ${props => props.column || 'auto'};
  grid-row: ${props => props.row || 'auto'};
  margin: ${props => props.center && 'auto'};
  color: ${props => props.color || 'inherit'};
`

export const AppContainer = styled.div`
  width: 100%;
  min-height: ${props =>
    props.headerIsOpen
      ? "calc(100vh - 50px)"
      : "100vh"
    };
  background: ${props => props.theme.color.background.primary};
  color: ${props => props.theme.color.text.primary};
  display: grid;
  grid-template-columns: ${navWidth}
                         ${menuWidth}
                         ${chatsListWidth}
                         ${chatWidth}
                         ${sidebarWidth};
  transition: .3s ease-out 0s min-height;
`

export const StyledChatWrap = styled.section`
  color: ${props => props.theme.color.text.primary};
  background: ${props => props.theme.color.background.primary};
  position: relative;
`

export const StyledForm = styled.form`
  color: inherit;
  background: inherit;
  width: 600px
  @media(max-width: 768px){
    width: 100%
  }
`

export const StyledLink = styled(({width, ...props}) => <Link {...props} />)`
  width: ${props => props.width || 'unset'};
`

export const Img = styled.img`
  border-radius: ${props => props.round ? '50%' : ';'}
`

export const Btn = styled(
    ({color, ...props}) => <Button {...props} />
  )`
  width: ${props => props.width || '100%'};
  background: ${props => props.color
    ? props.theme.color.btn[props.color].background
    : props.theme.color.btn.default.background
  };
  color: ${props => props.color
    ? props.theme.color.btn[props.color].text
    : props.theme.color.btn.default.text
  };
  margin: 10px auto;
  &:hover {
    background: ${props => props.theme.color.primary};
    color: ${props => props.theme.color.text.primary};
  }
`

const margin_position = css`
  ${props => props.grid_left ? 'margin-right: auto;' : ''}
  ${props => props.grid_right ? 'margin-left: auto;' : ''}
  ${props => props.noMargin ? 'margin: 0;' : ''}
`

export const H1 = styled.h1`
  color: ${props => props.color || ""};
  text-align: ${props => props.center ? 'center' : ''};
  font-size: 20px
  line-height: 1em
  ${margin_position}
`

export const H4 = styled.h4`
  color: ${props => props.color || ""};
  text-align: ${props => props.center ? 'center' : ''};
  font-size: 16px
  line-height: 1em
  ${margin_position}
`

export const P = styled.p`
  color: ${props =>
    props.color
      ? props.theme.color.text[props.color]
      : "inherit"
  }
  text-align: ${props => props.center ? 'center' : 'left'};
  font-size: 14px;
  font-weight: ${props => props.bold ? 'bold' : ''};
  display: ${props => props.inline && 'inline-block'};
  ${margin_position}
`

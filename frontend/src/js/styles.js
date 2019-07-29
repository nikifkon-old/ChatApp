import styled, { createGlobalStyle } from 'styled-components'
import { Button } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'

const bgColor = "#edeef0"

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

const Btn = styled(Button)`
    background: orangered
    width: 300px
    margin: 10px
`

const H1 = styled.h1`
  color: ${props => props.color || ""}
  font-size: 1.75rem
  line-height: 2rem;
`

const P = styled.p`
  color: ${props => props.color || ""}
  font-size: 1rem
  line-height: 1.5rem
`

export {
    GlobalStyle as default,
    MuiTheme,
    Btn,
    Wrapper,
    H1,
    P
}
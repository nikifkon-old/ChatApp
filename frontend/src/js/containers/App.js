import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'

import GlobalStyle, { MuiTheme, Wrapper, PageContainer } from '../styles'
import Home from '../routes/Home'
import GetStarted from '../routes/GetStarted'
import Login from '../routes/Login'
import { ChatApp } from '../containers'
import { Header } from '../components'
import { Private, AuthRouter } from '../HOC'


const App = ({showHeader}) => {
    return (
        <MuiThemeProvider theme={MuiTheme}>
          <Wrapper>
            <Header isOpen={showHeader} />
            <PageContainer
              menuisopen={showHeader}
              container
              direction="column"
              background="#edeef0"
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/app" component={Private(ChatApp)} />
                <Route path="/get-started" component={AuthRouter(GetStarted)} />
                <Route path="/login" component={AuthRouter(Login)} />
              </Switch>
            </PageContainer>
          </Wrapper>
          <GlobalStyle />
        </MuiThemeProvider>
    )
}

App.propTypes = {
  showHeader: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  showHeader: state.app.header.isOpen
})

export default connect(mapStateToProps, null)(App)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { actions } from '../containers/FriendList/FriendList.redux'

export default function(ComposedComponent) {
  class ChatMenuWithHandleViewList extends Component {
    static propTypes = {
      active_view: PropTypes.string.isRequired,
      HandleActiveView: PropTypes.func.isRequired,
      title: PropTypes.string.isRequired,
    }

    state = {
      active: false,
    }

    componentDidMount(){
      const { active_view, title } = this.props
      active_view === title ? this.setState({active: true}) : null
    }

    componentDidUpdate(prevProps){
      const { active_view, title } = this.props
      if(!(prevProps.active_view === active_view)) {
        active_view === title ? this.setState({active: true}) : this.setState({active: false})
      }
    }

    render() {
      const { HandleActiveView, ...rest } = this.props
      const { active } = this.state
      return (
        <ComposedComponent active={active} handleViewList={HandleActiveView} {...rest} />
      )
    }
  }

  const mapStateToProps = state => ({
    active_view: state.ui.friendList.active_view,
  }) 

  return connect(mapStateToProps, actions)(ChatMenuWithHandleViewList)
}
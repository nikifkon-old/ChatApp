import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { actions } from './FriendList.redux'
import { FriendList as FriendList_component } from '../../components'

export class FriendList extends Component {

  static propTypes = {
    active_view: PropTypes.string.isRequired
  }

  state = {
    data: []
  }

  getActiveViewData = () => {
    const { active_view } = this.props

    switch(active_view) {
      default:
        return [
          {
            asd: 1
          },
        ]
    }
  }

  componentDidMount() {
    const data = this.getActiveViewData()
    this.setState({data})
  }

  render() {
    const { active_view } = this.props

    return (
      <FriendList_component dialogs={this.state.data} />
    )
  }
}

const mapStateToProps = state => ({
  active_view: state.ui.friendList.active_view
})

export default connect(mapStateToProps, actions)(FriendList)
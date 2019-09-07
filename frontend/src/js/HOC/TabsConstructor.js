import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleActiveTabs } from '../actions/chatActions'


export default function (Tab) {
  class TabsConstructor extends React.Component {
      static propTypes = {
        handleActiveTabs: PropTypes.func.isRequired,
        activeTab: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
      }

      static defaultProps = {
          isActive: false,
      }

      state = {
        isActive: false
      }

      componentDidMount() {
        const { id, activeTab } = this.props

        if (id === activeTab) {
          this.setState({isActive: true})
        }
      }

      componentDidUpdate(prevState) {
        const { id, activeTab } = this.props
        if (id === activeTab && prevState.activeTab !== activeTab) {
          this.setState({isActive: true})
        }
        if (id !== activeTab && prevState.activeTab === id) {
          this.setState({isActive: false})
        }
      }

      render() {
        return (
          <Tab {...this.props} {...this.state} />
        )
      }
  }

  const mapStateToProps = state => ({
      activeTab: state.app.tabs.activeTab,
  })

  return connect(mapStateToProps, {
    handleActiveTabs,
  })(TabsConstructor)
}

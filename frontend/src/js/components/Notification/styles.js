import styled from 'styled-components'

// switch case https://stackoverflow.com/a/42438769
const NotificationContainer = styled.div`
  width: 100%
  height: 80px
  background: ${props => ({
    "error": (
      "#f00"
    ),
    default: (
      "#fff"
    )
  }[props.type])}
  opacity: .5
  color: #fff
  text-align: center
`

export {
  NotificationContainer,
}
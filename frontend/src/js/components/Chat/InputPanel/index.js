import React from 'react'
import PropTypes from 'prop-types'

import AttachFile from './AttachFile'
import Emotion from './Emotion'
import { IconButton } from '../../index'
import { StyledForm, MainInput } from '../styles'

const InputPanel = ({sendMessage, id}) => {
  const [inputValue, setInputValue] = React.useState('')

  function handleChange(event) {
    setInputValue(event.target.value)
  }

  function handleEnterPress(event) {
    if (event.keyCode === 13 && event.shiftKey  === false) {
      handleSend(event)
    }
  }

  function handleSend(event) {
    event.preventDefault()
    console.log(inputValue, id)
    sendMessage({text: inputValue, id})
  }

  function handleEmotion (emoji) {
    console.log(emoji);
    // const NewEmoji = <Emoji emoji={emoji.id} size={16} />
    setInputValue(inputValue + emoji.colons)
    console.log(inputValue);
  }

  return (
    <StyledForm
      onSubmit={handleSend}
    >
      <AttachFile />

      <MainInput
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEnterPress}
      />

      <Emotion
        onSelect={handleEmotion}
      />

      <IconButton
        icon="send"
        type="submit"
      />
    </StyledForm>
  )
}

InputPanel.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  id: PropTypes.number,
}

export default InputPanel

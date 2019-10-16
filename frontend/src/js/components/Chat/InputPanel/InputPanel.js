import React from 'react';
import PropTypes from 'prop-types';

import AttachFile from './AttachFile';
import Emotion from './Emotion';
import { IconButton } from '../../index';
import { StyledForm, MainInput } from '../styles';

function InputPanel(props) {
  const {
    sendMessage,
    id,
  } = props

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
    sendMessage({text: inputValue, id})
    setInputValue('')
  }

  function handleEmotion(emoji) {
    setInputValue(inputValue + emoji.colons)
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
  );
}

InputPanel.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  id: PropTypes.number,
};

export default InputPanel;

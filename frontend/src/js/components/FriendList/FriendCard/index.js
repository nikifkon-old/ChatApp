import React from 'react'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'

import { ContentGrid, Content, Img, P, dark_cont2 } from '../../../styles'

const FriendCard = ({dialog}) => {
    console.log(dialog)
    return (
        <ContentGrid container
          alignItems="center"
          justify="space-evenly"
        >
          <Content
            paddingDesctop="10px"
          >
            <Img src="http://127.0.0.1:3000/builds/frontend/src/assets/test_user_avatar.jpg" 
              round
              width="60px" 
              alt=""
            />
          </Content>
          <Content
            paddingDesctop="0"
            marginAuto
          >
            <P color="#fff" bold center>Kirsten Mckellar</P>
            <P color={dark_cont2} center>
              {"Thanks again you have been very kind".split(' ').slice(0, 3).join(' ')}...
            </P>
          </Content>
          
          <Content
            paddingDesctop="0"
            grid_right
          >
            <IconButton>
              <i className="material-icons light">
                more_horiz
              </i>
            </IconButton>
            <P color={dark_cont2}>2 min</P>
          </Content>
        </ContentGrid>
    )
}

FriendCard.propTypes = {
  dialog: PropTypes.object.isRequired
}

export default FriendCard
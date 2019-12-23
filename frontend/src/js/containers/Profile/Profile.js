import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getUserId } from '../../selectors/AuthSelectors'
import { Content, GridItem, ContentGrid, H1, P } from '../../styles'
import { useAction } from '../../hooks'
import { getProfile } from '../../actions/profilePageActions'
import { getProfileData, getRequestStatus } from '../../selectors/ProfilePageSelectors'

function Profile() {
  const { id } = useParams()

  let isMy = false
  const myId = useSelector(state => getUserId(state))
  if (myId === Number(id)) {
    isMy = true
  }

  const fetchProfile = useAction(getProfile)
  
  useEffect(() => {
    fetchProfile({id})
  }, [id])

  const { success, fetching, error }= useSelector(state => getRequestStatus(state))
  const data = useSelector(state => getProfileData(state))
  
  return (
    <GridItem
      column="3/5"
      component={ContentGrid}
      container
      direction="column"
      alignItems="center"
    >
      <Content>
        <H1 center>Profile of</H1>
        <P center>SomeUser : 123</P>
      </Content>
    </GridItem>
  )
}

export default Profile

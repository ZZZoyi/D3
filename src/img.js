import React from 'react'

const ProfilePic = (props) => {
  return (
    <img src={'http://graph.facebook.com/' + props.username + '/picture'} />
  )
}

const Avatar = (props) => {
  return (
    <div>
      <ProfilePic username={props.username} />
      <ProfilePic username={props.username} />
    </div>
  )
}

// render(
//   <Avatar username='pwh' />,
//   document.getElementById('example')
// )

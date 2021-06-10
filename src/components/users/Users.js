import React, { Component } from 'react';
import UserItem from './UserItem';

class Users extends Component {
  state = {
    users: [
      {
        id: '1',
        login: 'mateussenne',
        avatar_url: 'https://avatars.githubusercontent.com/u/13854939?v=4',
        html_url: 'https://github.com/mateussenne'
      },
      {
        id: '2',
        login: 'mateussenne2',
        avatar_url: 'https://avatars.githubusercontent.com/u/13854939?v=4',
        html_url: 'https://github.com/mateussenne'
      },
      {
        id: '3',
        login: 'mateussenne3',
        avatar_url: 'https://avatars.githubusercontent.com/u/13854939?v=4',
        html_url: 'https://github.com/mateussenne'
      } 
    ]
  }

  render() {
    return (
      <div style={userStyle}>
        {this.state.users.map(user => (          
          <UserItem key={user.id} user={user}/>       
        ))}
      </div>
    )
  }
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1em'
}

export default Users;

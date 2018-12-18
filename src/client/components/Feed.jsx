import React, { Component } from 'react';
import openSocket from 'socket.io-client';

class Feed extends Component {
  componentDidMount() {
    const socket = openSocket('http://localhost:3300');
    socket.on('EMS80000', data => {
      console.log('message: ', data)
    })
  }

  render() {
    return (
      <div>
        Feeds
      </div>
    );
  }
}

export default Feed;
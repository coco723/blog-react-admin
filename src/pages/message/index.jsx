import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ message, loading }) => ({
  message,
  loading: loading.models.message,
}))
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>message</div>;
  }
}

export default Message;

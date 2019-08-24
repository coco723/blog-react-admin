import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ third , loading}) => ({
  third,
  loading: loading.models.third,
}))

class Third extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      tabs: [],
      active: {},
    };
  }
  render() {
    return (
      <div>third</div>
    )
  }
}

export default Third;

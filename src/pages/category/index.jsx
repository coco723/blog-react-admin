import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ category, loading }) => ({
  category,
  loading: loading.models.category,
}))
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div>category</div>;
  }
}

export default Category;

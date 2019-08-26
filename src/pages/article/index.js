import React, { Component } from "react";
import { connect } from "dva";

@connect(({article, loading}) => ({
  article,
  loading: loading.models.article,
}))
class Article extends Component {
  state = {}

  render() {
    return (
      <div>article</div>
    )
  }
}

export default Article;

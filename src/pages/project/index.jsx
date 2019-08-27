import { Component } from 'react';
import { connect } from 'dva';

@connect(({ project, loading }) => ({
  project,
  loading: loading.models.project,
}))
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>project</div>;
  }
}

export default Project;

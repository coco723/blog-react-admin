import React, { PureComponent } from 'react';
import { Modal } from 'antd';

class DeleteProject extends PureComponent {
  render() {
    return (
      <Modal
        title="确认框"
        visible={this.props.visible}
        onOk={this.props.onClick}
        onCancel={this.props.onCancel}
        okText="确认"
        cancelText="取消"
      >
        确认删除该项目？
      </Modal>
    );
  }
}

export default DeleteProject;

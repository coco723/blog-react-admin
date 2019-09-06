import React, { PureComponent } from 'react';
import { Modal, Input, DatePicker, Select } from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const stateText = ['未开始', '进行中', '已完成'];
const stateMap = ['todo', 'doing', 'done'];

class AddProject extends PureComponent {
  render() {
    const { info } = this.props;
    const normalCenter = {
      marginBottom: 20,
    };
    return (
      <Modal
        title={this.props.mTitle}
        visible={this.props.visible}
        onOk={this.props.onClick}
        onCancel={this.props.onCancel}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <Input
            style={normalCenter}
            addonBefore="标题"
            size="large"
            placeholder="标题"
            name="title"
            value={info ? info.title : ''}
            onChange={this.props.handleChange}
          />
          <Input
            style={normalCenter}
            addonBefore="url"
            size="large"
            placeholder="url"
            name="url"
            value={info ? info.url : ''}
            onChange={this.props.handleChange}
          />
          <Input
            style={normalCenter}
            addonBefore="封面"
            size="large"
            placeholder="封面"
            name="img"
            value={info ? info.img : ''}
            onChange={this.props.handleChange}
          />
          <TextArea
            style={normalCenter}
            size="large"
            placeholder="内容"
            name="content"
            value={info ? info.content : ''}
            onChange={this.props.handleChange}
          />
          <RangePicker
            style={{ width: '100%', ...normalCenter }}
            onChange={this.props.onChangeTime}
          />
          <Select
            style={{ width: '100%', ...normalCenter }}
            placeholder="选择状态"
            defaultValue={stateText[this.props.state]}
            onChange={this.props.handleStateChange}
          >
            {stateText.map((item, key) => (
              <Option value={stateMap[key]}>{item}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    );
  }
}

export default AddProject;

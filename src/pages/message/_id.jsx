import React, { Component } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Input, Icon, Form, Button, message } from 'antd';

@connect(({ msg, loading }) => ({
  msg,
  loading: loading.effects['msg/fetch'],
}))
@Form.create()
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      content: '',
    };
  }

  componentDidMount() {
    const { dispatch, location } = this.props;
    const value = location.pathname.split('=');
    if (value.length > 0) {
      dispatch({
        type: 'msg/detail',
        payload: {
          id: value[1],
        },
      });
      this.setState({
        id: value[0],
      });
    }
  }

  handleChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = () => {
    const { id, content } = this.state;
    const { dispatch } = this.props;
    if (!id) {
      message.warn('该留言不存在，请刷新重试');
    }
    if (!content) {
      message.warn('回复内容不能为空');
    }
    dispatch({
      type: 'msg/update',
      payload: { id, content },
      callback: response => {
        if (response.success) {
          message.info('回复成功');
          dispatch({
            type: 'msg/detail',
            payload: { id },
          });
        } else {
          message.error('回复失败');
        }
      },
    });
  };

  render() {
    const {
      msg: { data },
    } = this.props;
    return (
      <GridContent>
        <Card bordered={false} title="留言详情">
          <div>
            <Input
              style={{ marginBottom: 40 }}
              prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="email"
              placeholder="邮箱（不能为空）"
              value={data ? data.email : ''}
              disabled
            />
            <Input
              style={{ marginBottom: 40 }}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="name"
              placeholder="名字（可为空）"
              value={data ? data.name : ''}
              disabled
            />
            <Input
              style={{ marginBottom: 40 }}
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="phone"
              placeholder="手机（可为空）"
              value={data ? data.phone : ''}
              disabled
            />
            <Input
              style={{ marginBottom: 40 }}
              prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="content"
              placeholder="留言内容（不能为空）"
              value={data ? data.content : ''}
              disabled
            />
          </div>
        </Card>
        <Card bordered={false} title="回复">
          <div>
            {data.reply_list
              ? data.reply_list.map(item => (
                  <Input.TextArea
                    style={{ marginBottom: 40 }}
                    name="reply_list"
                    value={item.content}
                    rows={4}
                  />
                ))
              : ''}
            <Input.TextArea
              style={{ marginBottom: 40 }}
              name="reply_list"
              placeholder="回复内容（不能为空）"
              value={this.state.content}
              onChange={this.handleChange}
              rows={4}
            />
            <div className="submit">
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
            </div>
          </div>
        </Card>
      </GridContent>
    );
  }
}

export default Comment;

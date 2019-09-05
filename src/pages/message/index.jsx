import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Modal, Tag, Divider } from 'antd';
import Link from 'umi/link';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

// 0：博主，1：其他 ，2：Github， 3：Wechat， 4：QQ
const state = ['未处理', '已处理'];
const stateMap = ['init', 'has'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
@connect(({ msg, loading }) => ({
  msg,
  loading: loading.effects['msg/fetch'],
}))
@Form.create()
class Message extends Component {
  columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => (
        <img alt={record.name} src={text} style={{ width: 50, height: 50, borderRadius: 50 }} />
      ),
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        {
          text: state[0],
          value: 0,
        },
        {
          text: state[1],
          value: 1,
        },
      ],
      render(val) {
        return <Tag key={stateMap[val]}>{state[val]}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => (
        <div>
          <Link to={`/msg/id=${record.id}`}>回复</Link>
          <Divider type="vertical" />
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.showModal(record);
              }}
            >
              删除
            </a>
          </Fragment>
        </div>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      visible: false,
      id: undefined,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'msg/fetch',
      payload: {},
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'msg/fetch',
      payload: {},
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'msg/fetch',
      payload: params,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'msg/fetch',
        payload: values,
      });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      id: undefined,
    });
  };

  showModal = record => {
    this.setState({
      visible: true,
      id: record.id,
    });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch({
      type: 'msg/remove',
      payload: { id },
    });
    this.setState({
      id: undefined,
      visible: false,
    });
  };

  render() {
    const {
      msg: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { visible } = this.state;

    const renderForm = (
      <Form style={{ marginBottom: 24 }} onSubmit={this.handleSearch} layout="inline">
        <Form.Item>{getFieldDecorator('content')(<Input placeholder="留言内容" />)}</Form.Item>
        <Form.Item className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    );

    return (
      <GridContent>
        <Card bordered={false} title="留言列表">
          <div className={styles.tableList}>
            {renderForm}
            <StandardTable
              loading={loading}
              rowKey={record => record.id}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="确认框"
          visible={visible}
          onOk={this.handleDelete}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          确定删除该留言？
        </Modal>
      </GridContent>
    );
  }
}

export default Message;

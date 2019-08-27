import React, { Component } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Form, Input, Row, Col, Button, Badge, Modal, Tag } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

// 0：博主，1：其他 ，2：Github， 3：Wechat， 4：QQ
const type = ['博主', '其他', 'Github', '微信', 'QQ'];
const typeMap = ['owner', 'other', 'github', 'wechat', 'qq'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
@connect(({ third, loading }) => ({
  third,
  loading: loading.effects['third/fetch'],
}))
@Form.create()
class Third extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
      visible: false,
      // eslint-disable-next-line
      _id: undefined,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'third/fetch',
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
      type: 'third/fetch',
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
      type: 'third/fetch',
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
        type: 'third/fetch',
        payload: values,
      });
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  showModal = record => {
    this.setState({
      visible: true,
      // eslint-disable-next-line
      _id: record._id,
    });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    // eslint-disable-next-line
    const { _id } = this.state;
    dispatch({
      type: 'third/remove',
      payload: {
        // eslint-disable-next-line
        _id,
      },
    });
    this.setState({
      _id: undefined,
      visible: false,
    });
  };

  render() {
    const {
      third: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { visible } = this.state;
    const columns = [
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
        title: '个人介绍',
        dataIndex: 'introduce',
        key: 'instroduce',
      },
      {
        title: '用户类型',
        dataIndex: 'type',
        key: 'type',
        filters: [
          {
            text: type[0],
            value: 0,
          },
          {
            text: type[1],
            value: 1,
          },
          {
            text: type[2],
            value: 2,
          },
          {
            text: type[3],
            value: 3,
          },
          {
            text: type[4],
            value: 4,
          },
        ],
        render(val) {
          return <Tag key={typeMap[val]}>{type[val]}</Tag>;
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
          <Button
            onClick={e => {
              e.preventDefault();
              this.showModal(record);
            }}
          >
            删除
          </Button>
        ),
      },
    ];

    const renderForm = (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Form.Item label="用户名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );

    return (
      <GridContent>
        <Card bordered={false} title="用户列表">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{renderForm}</div>
            <StandardTable
              loading={loading}
              // eslint-disable-next-line
              rowKey={record => record._id}
              data={data}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="确认框"
          visible={this.state.visible}
          onOk={this.handleDelete}
          onCancel={this.handleClose}
          okText="确认"
          cancelText="取消"
        >
          <p>确认删除该用户？</p>
        </Modal>
      </GridContent>
    );
  }
}

export default Third;

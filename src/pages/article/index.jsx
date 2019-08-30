import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Form, Input, Row, Col, Button, Modal, Tag, Divider } from 'antd';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';
import blogDomain from '@/utils/domain';

// 0：博主，1：其他 ，2：Github， 3：Wechat， 4：QQ
const stateText = ['草稿', '已发布'];
const stateMap = ['draft', 'published'];
const origin = ['原创', '转载', '混合'];
const originMap = ['Original', 'reprint', 'remix'];
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
@connect(({ article, loading }) => ({
  article,
  loading: loading.effects['article/fetch'],
}))
@Form.create()
class Article extends Component {
  columns = [
    {
      title: '封面图',
      dataIndex: 'img_url',
      key: 'img_url',
      render: (text, record) => (
        <img alt={record.title} src={text} style={{ width: 50, height: 50, borderRadius: 50 }} />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      filters: [
        {
          text: stateText[0],
          value: 0,
        },
        {
          text: stateText[1],
          value: 1,
        },
      ],
      render(val) {
        return <Tag key={stateMap[val]}>{stateText[val]}</Tag>;
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => (
        <span>
          {tags.length > 0
            ? tags.map(tag => (
                <Tag color="green" key={tag}>
                  {tag.name}
                </Tag>
              ))
            : ''}
        </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: category => (
        <span>
          {category.length > 0
            ? category.map(ca => (
                <Tag color="green" key={ca}>
                  {ca.name}
                </Tag>
              ))
            : ''}
        </span>
      ),
    },
    {
      title: '阅读',
      dataIndex: 'views',
      key: 'views',
      sorter: true,
    },
    {
      title: '点赞',
      dataIndex: 'likes',
      key: 'likes',
      sorter: true,
    },
    {
      title: '来源',
      dataIndex: 'origin',
      key: 'origin',
      filters: [
        {
          text: origin[0],
          value: 0,
        },
        {
          text: origin[1],
          value: 1,
        },
        {
          text: origin[2],
          value: 2,
        },
      ],
      render(val) {
        return <Tag key={originMap[val]}>{origin[val]}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <div>
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.showModel(record, { op: 'update' });
              }}
            >
              编辑
            </a>
          </Fragment>
          <Divider type="vertical" />
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.showModel(record, { op: 'comment' });
              }}
            >
              评论
            </a>
          </Fragment>
          <Divider type="vertical" />
          <Fragment>
            <a
              href={`${blogDomain}articleDetail?article_id=${record.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              详情
            </a>
          </Fragment>
          <Divider type="vertical" />
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.showModel(record, { op: 'delete' });
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
      // eslint-disable-next-line
      id: undefined,
      op: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetch',
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
      type: 'article/fetch',
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
      type: 'article/fetch',
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
        type: 'article/fetch',
        payload: values,
      });
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
      id: undefined,
      op: '',
    });
  };

  showModel = (record, { op }) => {
    const { dispatch } = this.props;
    switch (op) {
      case 'update':
        dispatch({
          type: 'article/detail',
          payload: {
            id: record.id,
          },
        });
        break;
      case 'comment':
        dispatch({
          type: 'article/comment',
          payload: {
            id: record.id,
          },
        });
        break;
      case 'delete':
      default:
        break;
    }
    this.setState({
      visible: true,
      // eslint-disable-next-line
      id: record.id,
      op,
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    // eslint-disable-next-line
    const { id } = this.state;
    switch (this.state.op) {
      case 'delete':
        dispatch({
          type: 'article/delete',
          payload: { id },
        });
        break;
      case 'update':
        dispatch({
          type: 'article/update',
          payload: { id },
        });
        break;
      case 'comment':
        dispatch({
          type: 'article/comment',
          payload: { id },
        });
        break;
      default:
        break;
    }
    this.setState({
      id: undefined,
      visible: false,
      op: '',
    });
  };

  render() {
    const {
      article: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { visible } = this.state;
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
              rowKey={record => record.id}
              data={data}
              columns={this.columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="确认框"
          visible={this.state.visible}
          onOk={this.handleSubmit}
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

export default Article;

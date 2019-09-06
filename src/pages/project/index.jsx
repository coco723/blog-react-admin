import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Tag, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';
import Add from './components/Add';
import DeleteProject from './components/Delete';

const stateText = ['未开始', '进行中', '已完成'];
const stateMap = ['todo', 'doing', 'done'];

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
@connect(({ project, loading }) => ({
  project,
  loading: loading.effects['project/fetch'],
}))
@Form.create()
class Project extends Component {
  columns = [
    {
      title: '封面',
      dataIndex: 'img',
      key: 'img',
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
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
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
        {
          text: stateText[2],
          value: 2,
        },
      ],
      render(val) {
        return <Tag key={stateMap[val]}>{stateText[val]}</Tag>;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      sorter: true,
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => (
        <div>
          <Fragment>
            <a
              onClick={e => {
                e.preventDefault();
                this.showModal({ op: 'update' }, record);
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
                this.showModal({ op: 'delete' }, record);
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
      op: '',
      title: '',
      img: '',
      url: '',
      content: '',
      start_time: new Date(),
      end_time: new Date(),
      state: 0,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetch',
      payload: {},
    });
  }

  showModal = ({ op }, record) => {
    this.setState({
      visible: true,
    });
    switch (op) {
      case 'add':
        this.setState({ op: 'add' });
        break;
      case 'update':
        this.setState({
          op: 'update',
          ...record,
        });
        break;
      case 'delete':
        this.setState({
          id: record.id,
          op: 'delete',
        });
        break;
      default:
        break;
    }
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
      type: 'project/fetch',
      payload: params,
    });
  };

  handleCreate = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/create',
      payload: { ...this.state },
    });
    this.setState({
      visible: false,
      id: undefined,
      title: '',
      img: '',
      content: '',
      url: '',
      op: '',
    });
  };

  handleUpdate = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/update',
      payload: { ...this.state },
    });
    this.setState({
      visible: false,
      id: undefined,
      title: '',
      img: '',
      content: '',
      url: '',
      op: '',
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
        type: 'project/fetch',
        payload: values,
      });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      id: undefined,
      op: '',
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch({
      type: 'project/remove',
      payload: { id },
    });
    this.setState({
      id: undefined,
      visible: false,
      op: '',
    });
  };

  handleChangeTime = (date, dateString) => {
    this.setState({
      start_time: new Date(dateString[0]),
      end_time: new Date(dateString[1]),
    });
  };

  renderHandle() {
    const { op } = this.state;
    switch (op) {
      case 'add':
        return (
          <Add
            mTitle="添加项目"
            visible={this.state.visible}
            onClick={this.handleCreate}
            onCancel={this.handleCancel}
            handleChange={this.handleChange}
            info={this.state}
            onChangeTime={this.handleChangeTime}
          />
        );
      case 'update':
        return (
          <Add
            mTitle="编辑项目"
            visible={this.state.visible}
            onClick={this.handleUpdate}
            onCancel={this.handleCancel}
            handleChange={this.handleChange}
            info={this.state}
            onChangeTime={this.handleChangeTime}
          />
        );
      case 'delete':
        return (
          <DeleteProject
            onClick={this.handleDelete}
            onCancel={this.handleCancel}
            visible={this.state.visible}
          />
        );
      default:
        break;
    }
    return null;
  }

  render() {
    const {
      project: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const renderForm = (
      <Form onSubmit={this.handleSearch} layout="inline" style={{ marginBottom: 24 }}>
        <Form.Item label="分类名">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </Form.Item>
        <Form.Item className={styles.submitButtons}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={e => {
              e.preventDefault();
              this.showModal({ op: 'add' });
            }}
          >
            新增
          </Button>
        </Form.Item>
      </Form>
    );

    return (
      <GridContent>
        <Card bordered={false} title="用户列表">
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
        {this.renderHandle()}
      </GridContent>
    );
  }
}

export default Project;

import React, { Component } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
@connect(({ category, loading }) => ({
  category,
  loading: loading.effects['category/fetch'],
}))
@Form.create()
class Category extends Component {
  columns = [
    {
      title: '分类名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: '',
      render: (text, record) => (
        <Button
          onClick={e => {
            e.preventDefault();
            this.showModal({ op: 'delete' }, record);
          }}
        >
          删除
        </Button>
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
      name: '',
      desc: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'category/fetch',
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
      type: 'category/fetch',
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
        type: 'category/fetch',
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

  handleDelete = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    dispatch({
      type: 'category/remove',
      payload: { id },
    });
    this.setState({
      id: undefined,
      visible: false,
      op: '',
    });
  };

  handleCreate = () => {
    const { dispatch } = this.props;
    const { name, desc } = this.state;
    dispatch({
      type: 'category/create',
      payload: { name, desc },
    });
    this.setState({
      visible: false,
      id: undefined,
      name: '',
      desc: '',
      op: '',
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const {
      category: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    const { visible } = this.state;
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

    const isDelete = () => this.state.op === 'delete';

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
        <Modal
          title={isDelete() ? '确认框' : '添加标签'}
          visible={visible}
          onOk={isDelete() ? this.handleDelete : this.handleCreate}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          {isDelete() ? (
            <p>确认删除该分类？</p>
          ) : (
            <div>
              <Input
                style={{ marginBottom: 24 }}
                addonBefore="分类名"
                size="large"
                placeholder="分类名"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <Input
                addonBefore="描述"
                size="large"
                placeholder="描述"
                name="desc"
                value={this.state.desc}
                onChange={this.handleChange}
              />
            </div>
          )}
        </Modal>
      </GridContent>
    );
  }
}

export default Category;

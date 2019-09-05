import React, { Component } from 'react';
import { connect } from 'dva';
import { GridContent } from '@ant-design/pro-layout';
import { Input, Select, AutoComplete, Button, message } from 'antd';
import ReactMarkdown from 'for-editor';

const InputGroup = Input.Group;
const { Option } = Select;

const origin = ['原创', '转载', '混合'];

const defaultValue = `
  # 标题一
  ## 标题二
  ## 标题三
`;

@connect(({ article, loading }) => ({
  article,
  loading: loading.effects['article/fetch'],
}))
class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      titile: '',
      origin: origin[0],
      tags: '',
      category: '',
      content: defaultValue,
      text: '',
      id: undefined,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'tag/list',
    //   payload: {}
    // });
    // dispatch({
    //   type: 'category/list',
    //   payload: {}
    // });
  }

  delete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/remove',
      payload: { id: this.state.id },
      callback: response => {
        if (!response.success) {
          this.setState({
            text: '舍弃失败',
          });
        } else {
          this.setState({
            id: undefined,
            text: '已舍弃',
          });
        }
      },
    });
  };

  updateChange = () => {
    const { dispatch } = this.props;
    this.setState({
      text: '保存中...',
    });
    dispatch({
      type: 'article/update',
      payload: {
        ...this.state,
      },
      callback: response => {
        if (!response.success) {
          this.setState({
            text: '保存失败',
          });
        } else {
          this.setState({
            id: response.data.id,
            text: '已保存至草稿箱<a >[舍弃]</a>',
          });
        }
      },
    });
  };

  titleChange = e => {
    e.preventDefault();
    this.setState({
      title: e.target.value,
    });
    this.updateChange();
  };

  originChange = e => {
    e.preventDefault();
    this.setState({
      origin: e.target.value,
    });
    this.updateChange();
  };

  tagChange = e => {
    e.preventDefault();
    this.setState({
      tags: e.target.value,
    });
    this.updateChange();
  };

  handleChange = content => {
    this.setState({
      content,
    });
    this.updateChange();
  };

  categoryChange = e => {
    e.preventDefault();
    this.setState({
      category: e.target.value,
    });
    this.updateChange();
  };

  handlePublish = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/update',
      payload: {
        ...this.state,
      },
      callback: response => {
        if (!response.success) {
          this.setState({
            text: '文章发布成功',
          });
          message.error('文章发布成功');
        } else {
          this.setState({
            text: '文章发布失败',
          });
          message.info('文章发布失败');
        }
      },
    });
  };

  render() {
    const categoryList = [];
    const tags = [];
    return (
      <GridContent>
        <div>
          <Button
            style={{ backgroundColor: '#1890ff', color: 'white', marginRight: 15 }}
            onClick={this.handlePublish}
          >
            发布文章
          </Button>
          <span
            onClick={this.delete}
            dangerouslySetInnerHTML={{
              __html: this.state.text,
            }}
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <InputGroup compact>
            <Select
              style={{ width: '10%' }}
              defaultValue={this.state.origin}
              onChange={this.originChange}
            >
              {origin.map((item, key) => (
                <Option value={key}>{item}</Option>
              ))}
            </Select>
            <AutoComplete
              dataSource={this.state.dataSource}
              style={{ width: '90%' }}
              onChange={this.titleChange}
              placeholder="标题: 那是我夕阳下的奔跑"
            />
          </InputGroup>
        </div>
        <div style={{ marginTop: 15 }}>
          <Select
            mode="multiple"
            style={{ width: '50%' }}
            placeholder="请选择分类(可选，默认：其他)"
            onChange={this.tagChange}
          >
            {categoryList
              ? categoryList.map(item => <Option key={item.key}>{item.name}</Option>)
              : ''}
          </Select>
          <Select
            mode="multiple"
            style={{ width: '50%' }}
            placeholder="请选择标签(可选，默认：其他)"
            onChange={this.categoryChange}
          >
            {tags ? tags.map(item => <Option key={item.key}>{item.name}</Option>) : ''}
          </Select>
        </div>
        <div style={{ marginTop: 15 }}>
          <ReactMarkdown value={this.state.content} onChange={this.handleChange} />
        </div>
      </GridContent>
    );
  }
}

export default ArticleDetail;

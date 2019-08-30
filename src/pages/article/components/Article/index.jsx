import React, { Component } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Input, Select, AutoComplete } from 'antd';
import ReactMarkdown from 'react-markdown';
// import Highlight from 'react-highlight';

const InputGroup = Input.Group;
const { Option } = Select;

const origin = ['原创', '转载', '混合'];
class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'tag/list',
    //   payload: {}
    // });
    // dispatch({
    //   type: 'category/list',
    //   payload: {}
    // });
    // markdown 文件高亮
    // const els = document.querySelectorAll('pre code');
    // for (let i = 0; i < els.length; i++) {
    //   if (!els[i].classList.contains('js')) {
    //     window.hljs.highlightBlock(els[i]);
    //   }
    // }
  }

  handleChange = () => {};

  render() {
    const categoryList = [];
    const tags = [];
    const content = `
    This block of Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require the <code>html-parser</code> AST plugin to be loaded, in addition to setting the <code class="prop">escapeHtml</code> property to false.
    `;
    return (
      <GridContent>
        <InputGroup compact>
          <Select style={{ width: '10%' }} defaultValue={origin[0]}>
            {origin.map((item, key) => (
              <Option value={key}>{item}</Option>
            ))}
          </Select>
          <AutoComplete
            dataSource={this.state.dataSource}
            style={{ width: '90%' }}
            onChange={this.handleChange}
            placeholder="标题: 那是我夕阳下的奔跑"
          />
        </InputGroup>
        <div style={{ marginTop: 15 }}>
          <Select
            mode="multiple"
            style={{ width: '50%' }}
            placeholder="请选择分类(可选，默认：其他)"
            onChange={this.handleChange}
          >
            {categoryList
              ? categoryList.map(item => <Option key={item.key}>{item.name}</Option>)
              : ''}
          </Select>
          <Select
            mode="multiple"
            style={{ width: '50%' }}
            placeholder="请选择标签(可选，默认：其他)"
            onChange={this.handleChange}
          >
            {tags ? tags.map(item => <Option key={item.key}>{item.name}</Option>) : ''}
          </Select>
        </div>
        <ReactMarkdown source={content} />
      </GridContent>
    );
  }
}

export default ArticleDetail;

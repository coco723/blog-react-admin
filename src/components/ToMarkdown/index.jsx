import React, { PureComponent } from 'react';
import Markdown from 'react-markdown/with-html';
import Editor from './editor';
import CodeBlock from './code-block';
import MarkdownControls from './markdown-controls';
import styles from './index.less';

const initialSource = `
# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`;

class ToMarkdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      markdownSrc: initialSource,
      htmlMode: 'raw',
    };
  }

  handleMarkdownChange = e => {
    this.setState({ markdownSrc: e.target.value });
  };

  handleControlsChange = mode => {
    this.setState({ htmlMode: mode });
  };

  render() {
    return (
      <div>
        <div className={styles['editor-pane']}>
          <MarkdownControls onChange={this.handleControlsChange} mode={this.state.htmlMode} />
          <Editor value={this.state.markdownSrc} onChange={this.handleMarkdownChange} />
        </div>

        <div className={styles['result-pane']}>
          <Markdown
            className="result"
            source={this.state.markdownSrc}
            skipHtml={this.state.htmlMode === 'skip'}
            escapeHtml={this.state.htmlMode === 'escape'}
            renderers={{ code: CodeBlock }}
          />
        </div>
      </div>
    );
  }
}

// if (typeof window !== 'undefined') {
//   ReactDOM.render(<Demo />, document.getElementById('main'))
// }

export default ToMarkdown;

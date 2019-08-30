const React = require('react');
const PropTypes = require('prop-types');

const hljs = () => window.hljs;

class CodeBlock extends React.PureComponent {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  setRef = el => {
    this.codeEl = el;
  };

  highlightCode = () => {
    hljs.highlightBlock(this.codeEl);
  };

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

CodeBlock.defaultProps = {
  language: '',
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};

module.exports = CodeBlock;

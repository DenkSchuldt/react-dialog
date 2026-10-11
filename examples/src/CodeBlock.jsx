import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light.js';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript.js';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx.js';
import ghcolors from 'react-syntax-highlighter/dist/esm/styles/prism/ghcolors.js';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

export default function CodeBlock({ text }) {
  const lines = text.split('\n');
  const indentation = Math.min(...lines.filter(line => line.trim()).map(line => line.search(/\S/)));
  const code = lines.map(line => line.slice(indentation)).join('\n').trim();

  return (
    <SyntaxHighlighter
      language='jsx'
      style={ghcolors}
      className='app-code-block'
      customStyle={{
        margin: 0,
        padding: '20px',
        border: 0,
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.75)',
        fontSize: '14px',
        lineHeight: 1.5
      }}
      codeTagProps={{ style: { fontSize: 'inherit', lineHeight: 'inherit' } }}>
      {code}
    </SyntaxHighlighter>
  );
}

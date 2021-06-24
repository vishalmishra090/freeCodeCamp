import React from 'react'
import 'github-markdown-css'
import "highlight.js/styles/github.css";
import useTheme from '../hooks/useTheme';
import useMarkdown from '../hooks/useMarkdown';
import  marked from 'marked'
import parse from 'html-react-parser';
import hljs from "highlight.js";

marked.setOptions({
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    breaks: true
});

function PreviewBox() {
    let {theme} = useTheme()
    let {markdown} = useMarkdown()
    
    return (
        <div id="previewBox" style={{...theme.previewBox}}>
            <div id="previewHeader">
                Preview
            </div>
            <div id="preview" className="markdown-body">
               {parse(marked(markdown),{ trim: true })}
            </div>
        </div>
    )
}

export default PreviewBox

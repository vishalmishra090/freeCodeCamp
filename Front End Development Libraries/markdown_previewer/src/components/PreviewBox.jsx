import React from 'react'
import 'github-markdown-css'
import "highlight.js/styles/github.css";
import useTheme from '../hooks/useTheme';
import useMarkdown from '../hooks/useMarkdown';
import  marked from 'marked'
import hljs from "highlight.js";
import DOMpurify from 'dompurify'
import parse from 'html-react-parser'



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
              {parse(DOMpurify.sanitize(marked(markdown)))}
            </div>
        </div>
    )
}

export default PreviewBox

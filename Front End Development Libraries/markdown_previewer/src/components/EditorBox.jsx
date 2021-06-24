import React from 'react'
import useMarkdown from '../hooks/useMarkdown';
import useTheme from '../hooks/useTheme';

function EditorBox() {
    let {markdown, setMarkdown} = useMarkdown()
    let {theme} = useTheme()

    function handelChange(e){
       setMarkdown(e.target.value);
    }
    return (
        <div id="editorBox" style={{...theme.editorBox}}>
            <div id="editorHeader">
                Markdown
            </div>
            <textarea 
            className="" 
            name="editor" 
            id="editor"
            spellCheck={false}
            value={markdown}
            onChange={handelChange}
            >
            </textarea> 
        </div>
    )
}

export default EditorBox

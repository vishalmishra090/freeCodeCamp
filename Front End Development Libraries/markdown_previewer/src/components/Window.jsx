import React from 'react'
import EditorBox from './EditorBox'
import PreviewBox from './PreviewBox';
import { MarkdownProvider } from '../context/MarkdownContext';


function Window() {
    
    return (
      <div id="window">
        <MarkdownProvider>
            <EditorBox />
            <PreviewBox />   
        </MarkdownProvider>
      </div>
    )
}

export default Window

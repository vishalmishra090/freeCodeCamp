import React,{useState} from 'react'
import demoMarkdown from '../demoMarkdown';

const MarkdownContext = React.createContext();

export const MarkdownProvider = ({
    children
}) => {
    let [markdown, setMarkdown] = useState(demoMarkdown)
   return (
       <MarkdownContext.Provider value={{
           markdown,setMarkdown
       }}>
           {children}
       </MarkdownContext.Provider>
   )
}


export default MarkdownContext
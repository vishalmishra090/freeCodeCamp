import {useContext} from 'react'
import MarkdownContext from '../context/MarkdownContext'

const useMarkdown = () => {
    return useContext(MarkdownContext)
}

export default useMarkdown
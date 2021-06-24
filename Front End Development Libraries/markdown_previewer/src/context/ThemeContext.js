import React,{useState} from 'react'

let initialTheme = () => {
    if(window.innerWidth >= 800){
        return {
            editorBox: {
                left: "0",
                width: "50%"
            },
            previewBox: {
               left: "50%",
               width: "50%"
            }
        }
    }else{
        return {
            editorBox: {
                left: "0",
                width: "100%"
            },
            previewBox: {
               left: "100%",
               width: "100%"
            }
        }
    }
}

const ThemeContext = React.createContext()

export const ThemeProvider = ({
    children
}) => {
    let [theme, setTheme] = useState(initialTheme)
    return (
       <ThemeContext.Provider value={{theme,setTheme}}>
          {children}
       </ThemeContext.Provider>
    )
}

export default ThemeContext



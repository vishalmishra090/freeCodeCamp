import React,{useEffect,useState} from 'react'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import useTheme from '../hooks/useTheme'

function Header() {
    let {setTheme} = useTheme()
    let [showPreview, setShowPreview] = useState(false)
    
     function handelPreview(){
         setShowPreview((prev) => !prev);
     }
     
    useEffect(() => {

        if(showPreview){
            setTheme((prevTheme) => ({
                ...prevTheme,
                editorBox: {
                    left: "-100%",
                    width: "100%"
                },
                previewBox: {
                    left: "0%",
                    width: "100%"
                }
            }))
        }else{
            onResize()
        }
        
        function onResize(){
           if(window.innerWidth >= 800){
              setShowPreview(false)
              setTheme((prevTheme) => ({
                  ...prevTheme,
                  editorBox: {
                      left: "0%",
                      width: "50%"
                  },
                  previewBox: {
                      left: "50%",
                      width: "50%"
                  }
              }))
           }else{
            if(!showPreview){
                setTheme((prevTheme) => ({
                    ...prevTheme,
                    editorBox: {
                        left: "0%",
                        width: "100%"
                    },
                    previewBox: {
                        left: "100%",
                        width: "100%"
                    }
                }))
            }else{
                setTheme((prevTheme)=>({
                    ...prevTheme
                }))
            }
             
           }
        }
        
        window.addEventListener("resize",onResize)

        return () => {
            window.removeEventListener("resize",onResize)
        }
        
    },[showPreview,setTheme])
    return (
            <div  id="header">
               
               <p className="header-name">Markdown Previewer</p>
               <div 
               className="preview-icon"
               onClick={handelPreview}
               >
                   {
                       showPreview ?
                       <FaEye /> :
                       <FaEyeSlash />
                   }
               </div>
                
            </div>

    )
}

export default Header

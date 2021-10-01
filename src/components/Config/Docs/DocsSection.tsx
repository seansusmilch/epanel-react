import React, {useEffect, useState} from 'react'
import {getHomeDoc, saveHomeDoc} from 'fbase'
import MDEditor from '@uiw/react-md-editor'
import { HeadingRenderer, ImageRenderer } from 'components/Md/Renderers'
import './DocsSection.sass'
import { store } from 'react-notifications-component'

export const DocSection:React.FC = (props) => {

    const [loaded, setLoaded] = useState(false)
    const [md, setMd] = useState<string | undefined>('')

    useEffect(()=>{
        (async()=>{
            let data:any = await getHomeDoc()
            // console.log(data)
            setMd(data)
            setLoaded(true)
        })()
    },[])

    const handleSubmit = ()=>{
        saveHomeDoc(md).then(()=>{
            store.addNotification({
                title: "Home Doc Saved",
                message: "New home doc has been saved!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              })
        })
    }

    return(<>
        {loaded?
        <>
            <div>
                <MDEditor
                    // className='bg-dark text-white'
                    // textareaProps={{className:'text-white'}}

                    height={600}
                    value={md}
                    onChange={setMd}
                    visiableDragbar={false}
                    previewOptions={{
                        renderers:{
                            'heading':HeadingRenderer,
                            'image': ImageRenderer
                        },
                        className:'bg-dark text-white'
                    }}
                />
                {/* <MDEditor.Markdown source={md?md:''}/> */}
                {/* <ReactMarkdown source={md?md:''} /> */}
            </div>

            <button 
                className='btn btn-primary btn-block mt-3'
                onClick={()=>{handleSubmit()}}
                >Save</button>
        </>
            :
            <p>Loading markdown editor</p>
        }
    </>)
}
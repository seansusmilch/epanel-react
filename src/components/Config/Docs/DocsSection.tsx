import React, {useEffect, useState} from 'react'
import {getHomeDoc} from '../../../base'
import MDEditor from '@uiw/react-md-editor'
import ReactMarkdown from 'react-markdown'
import { HeadingRenderer } from '../../Md/Renderers'
import { saveHomeDoc } from '../../../base/func'
import './DocsSection.sass'

export const DocSection:React.FC = (props) => {

    const [loaded, setLoaded] = useState(false)
    const [md, setMd] = useState<string | undefined>('poggers')

    useEffect(()=>{
        (async()=>{
            let data:any = await getHomeDoc()
            // console.log(data)
            setMd(data)
            setLoaded(true)
        })()
    },[])

    const handleSubmit = ()=>{
        saveHomeDoc(md)
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
                            'heading':HeadingRenderer
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
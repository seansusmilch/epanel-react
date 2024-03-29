import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getHomeDoc } from 'fbase'
import { HeadingRenderer, ImageRenderer } from 'components/Md'

export const HomeDoc:React.FC = (props)=>{
    const [md, setMd] = useState<string>('')
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        const mdPromise = new Promise<void>(async(resolve)=>{
            let data:any = await getHomeDoc()
            setMd(data)
            resolve()
        })
        mdPromise.then(()=>{setLoaded(true)})
    },[])

    return(<>
    {loaded ?
        <ReactMarkdown 
            source={md} 
            allowDangerousHtml={true} 
            renderers={{'heading':HeadingRenderer, 'image':ImageRenderer}}
            />
        :
        <p>Loading...</p>
    }
    
    </>)
}
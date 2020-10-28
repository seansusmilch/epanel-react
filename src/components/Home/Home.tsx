import React, {useEffect, useState} from 'react'
import './home.css'
import {StatusSection} from './status/Section'
import marked from 'marked'
import {QLinks} from './qlinks/QLinks'

export const Home = ()=>{
    const [md, setMd] = useState<string>('')

    useEffect(() =>{
        const mdPath = require('./home.md')

        fetch(mdPath)
            .then((res: any) =>{
                return res.text()
            })
            .then((text: string)=>{
                setMd(marked(text))
            })
    },[])

    return (
        <div>
            <StatusSection
                announcement="Poggy woggy dub dub"
                up={true}
                statusText="POGGIES"
            />
            {/* Links compoonnntt */}
            <QLinks
                isLoggedIn={true}
                isAdmin={true}
            />
            {/* markdonw */}
            <div dangerouslySetInnerHTML={{__html: md}}/>
        </div>
    )
}
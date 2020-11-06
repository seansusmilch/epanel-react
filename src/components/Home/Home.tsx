import React, {useContext, useEffect, useState} from 'react'
import './home.css'
import {StatusSection} from './status/Section'
import marked from 'marked'
import {QLinks} from './qlinks/QLinks'
import {UserContext} from '../Auth'

export const Home: React.FC = ()=>{
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

    const user = useContext(UserContext)
    // console.log('user', user? user : 'null')

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
            {user != null ? <div dangerouslySetInnerHTML={{__html: md}}/>
            :
            <div className='text-center'>
                <h3 className="bg-danger rounded d-inline p-3">Please login to see info</h3>
            </div>
            }
        </div>
    )
}
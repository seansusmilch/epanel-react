import React, {useContext, useEffect, useState} from 'react'
import './home.css'
import {StatusSection} from './status/Section'
import {QLinks} from './qlinks/QLinks'
import {UserContext} from '../Auth'
import {ToTop} from './ToTop'

import {StatusProps} from '../Props'
// import {backend} from '../../base'
import axios from 'axios'

import marked from 'marked'
import ReactMarkdown from 'react-markdown'

interface Props {
    getStatus: ()=>Promise<StatusProps>
}

export const Home: React.FC<Props> = (props:Props)=>{
    const [md, setMd] = useState<string>('')

    const [status,setStatus] = useState<StatusProps>()

    useEffect(() =>{
        const mdPath = require('./docs.md')

        fetch(mdPath)
            .then((res: any) =>{
                return res.text()
            })
            .then((text: string)=>{
                setMd(text)
            })


        const getIt = async()=>{
            const s = await props.getStatus()
            setStatus(s)
            // console.log(s)
            console.log('fetched status!')
        }
        getIt()

        let autoUpdate = setInterval(getIt, 30000)

        return ()=>{
            // console.log('Cleared!!!!')
            clearInterval(autoUpdate)
        }
    },[])


    const user = useContext(UserContext)
    // console.log('user', user? user : 'null')

    return (
        <div>
            <section>
                <StatusSection
                    announcement={status ? status.current.announcement : ''}
                    statusColor={status ? status.current.status_col : ''}
                    statusText={status ? status.current.status_msg : ''}
                    lastUpdated={status ? status.lastUpdated : null}
                />
                {/* Links compoonnntt */}
                <QLinks
                    isLoggedIn={user ? true:false}
                    isAdmin={user ? user.isAdmin: false}
                />
            </section>

            <ToTop/>
            {/* markdonw */}
            <section>
                {user != null ? <div><ReactMarkdown source={md} allowDangerousHtml={true} /></div>
                :
                <div className='text-center'>
                    <h3 className="bg-danger rounded d-inline p-3">Please login to see info</h3>
                </div>
                }
            </section>
            

            <br/><br/><br/><br/><br/>
        </div>
    )
}
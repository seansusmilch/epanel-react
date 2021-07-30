import React, {useContext, useEffect, useState} from 'react'
import './home.sass'
import {StatusSection} from './status/Section'
import {QLinks} from './qlinks/QLinks'
import {UserContext} from 'components/Auth'
// import {ToTop} from './ToTop'

import {StatusProps} from 'components/Props'
import Div100vh from 'react-div-100vh'
import { isMobile } from 'react-device-detect'
import { HomeDoc } from './HomeDoc'
import { useLocation } from 'react-router-dom'

interface Props {
    getStatus: ()=>Promise<StatusProps>
}

export const Home:React.FC<Props> = (props)=>{
    // const [md, setMd] = useState<string>('')
    const [status,setStatus] = useState<StatusProps>()

    const [isLoaded, setLoaded] = useState(false)
    const user = useContext(UserContext)

    const {pathname, hash} = useLocation()

    useEffect(()=>{
        console.log(hash)
        if(hash!==''){
            const scrll = setInterval(() => {
                    window.scrollTo(0,0)
                    const id = hash.replace('#', '')
                    const element = document.getElementById(id)
                    // console.log(element)
                    if (element) {
                        clearInterval(scrll)
                        element.scrollIntoView({behavior: 'smooth'})
                    }
                },
                100
            )
        }
    }, [pathname])
    

    useEffect(() =>{

        const getIt = async()=>{
            const s = await props.getStatus()
            setStatus(s)
        }

        const statusPromise = new Promise<void>(async(resolve)=>{
            await getIt()
            resolve()
        })

        statusPromise.then(()=>{setLoaded(true)})


        let autoUpdate = setInterval(getIt, 30000)

        return ()=>{
            // console.log('Cleared!!!!')
            clearInterval(autoUpdate)
        }
    },[props])

    // console.log('user', user? user : 'null')

    return (isLoaded?
        
        <div>
            {/* <section className='d-flex flex-column justify-content-around text-center fullscreen-section'>
                <StatusSection
                    announcement={status ? status.current.announcement : ''}
                    statusColor={status ? status.current.status_col : ''}
                    statusText={status ? status.current.status_msg : ''}
                    lastUpdated={status ? status.lastUpdated : null}
                />
                <QLinks
                    isLoggedIn={user ? true:false}
                    isAdmin={user ? user.isAdmin: false}
                />
            </section> */}

            <Div100vh className='text-center fullscreen-section'>
                <div className={'d-flex flex-column justify-content-around ' + (isMobile? 'mobile-cut' : 'h-100')}>
                    <StatusSection
                        announcement={status ? status.current.announcement : ''}
                        statusColor={status ? status.current.status_col : ''}
                        statusText={status ? status.current.status_msg : ''}
                        lastUpdated={status ? status.lastUpdated : null}
                    />
                    <QLinks
                        isLoggedIn={user ? true:false}
                        isAdmin={user ? user.isAdmin: false}
                    />
                </div>
            </Div100vh>

            
            {/* markdonw */}
            {/* <section className='container p-0'>
                {user != null ? 
                <HomeDoc/>
                :
                <div className='text-center'>
                    <h3 className="bg-danger rounded d-inline p-3">Please login to see info</h3>
                </div>
                }
            </section> */}
            <section className='container p-0'>
                <HomeDoc/>
            </section>
            

            <br/><br/><br/><br/><br/>
        </div>
        :
        <p>Loading...</p>)
}
import React, { useContext, useEffect, useState } from "react"
import {Status} from './Status/Status'
import {StatusProps, NewStatus} from '../Props'
import {UserContext} from '../Auth'
import { DocSection } from "./Docs/DocsSection"
import {NotFoundError} from 'components/Error'


interface Props{
    // getConfig: ()=>void //change
    getStatus: ()=>Promise<StatusProps>
    setStatus: (newStatus:StatusProps)=>Promise<void>
}

export const Config: React.FC<Props> = (props) => {

    const [status,setStateStatus] = useState<StatusProps>()

    const user = useContext(UserContext)    

    useEffect(()=>{
        // const fetchStatus = async()=>{
        //     const res = await axios(`${backend}/config/status`)
        //     setStatus(res.data)
        // }
        // fetchStatus()
        const fetchStatus = async()=>{
            setStateStatus(await props.getStatus())
        }
        fetchStatus()
    },[props])

    const submitStatus = async(values:NewStatus)=>{

        if(!status){
            console.log('Status is null!!!', status)
            return
        }
        // console.log(values)
        let newStatus = status

        newStatus.current.announcement = values.announcement

        if(values.auto){
            newStatus.auto.down_col = values.down_col
            newStatus.auto.down_msg = values.down_msg
            newStatus.auto.up_col = values.up_col
            newStatus.auto.up_msg = values.up_msg
            newStatus.auto.enabled = true

            // somehow update status right away
            // probably make a backend thing
        }else{
            newStatus.auto.enabled = false
            newStatus.current.status_col = values.status_col
            newStatus.current.status_msg = values.status_msg
        }

        setStateStatus(newStatus)

        props.setStatus(newStatus)
    }

    return (
        user?.isAdmin ?
        <div>
            <br/>
            <div className='jumbotron bg-dark p-3 text-center'>
                <div className='display-4'>Config</div>
            </div>
            {status?
                <Status
                    status= {status}
                    handleSubmit={submitStatus}
                />
                :
                ''
            }
            <DocSection/>
        </div>
        :
        <NotFoundError/>
        // <Redirect to='/'/>
    )
}
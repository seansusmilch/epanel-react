import React, { useContext, useEffect, useState } from "react"
import {Status, defaultStatus} from './Status/Status'
import {StatusProps} from '../Props'
import axios from 'axios'
import {backend} from '../../base'
import {UserContext,idToken} from '../Auth'
import { Redirect } from "react-router-dom"


interface Props{
    getConfig: ()=>void //change
    getStatus: ()=>Promise<StatusProps>
}

export const Config: React.FC<Props> = (props) => {

    const [status,setStatus] = useState<StatusProps>()

    const user = useContext(UserContext)    

    useEffect(()=>{
        // const fetchStatus = async()=>{
        //     const res = await axios(`${backend}/config/status`)
        //     setStatus(res.data)
        // }
        // fetchStatus()
        const fetchStatus = async()=>{
            setStatus(await props.getStatus())
        }
        fetchStatus()
    },[])

    const submitStatus = async(values:{
        announcement: string
        auto: boolean
        down_col: string
        down_msg: string
        status_col: string
        status_msg: string
        up_col: string
        up_msg: string
    })=>{

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

        setStatus(newStatus)

        //send to backend
        console.log(user)
        const body = {
            uid: user.uid,
            idToken: idToken,

            status: newStatus
        }
        console.log(body)
        axios.post(`${backend}/config/status`, body)
            .then((res)=>{
                console.log(res.data)
            })
    }

    return (
        user?.isAdmin ?
        <div>
            <h1>Config Page</h1>
            {status?
                <Status
                    status= {status}
                    handleSubmit={submitStatus}
                />
                :
                ''
            }
        </div>
        :
        <Redirect to='/'/>
    )
}
import React from 'react'
import { Invite } from '../../Props'
import {timeSince} from '../../Helper'
import { X } from 'react-bootstrap-icons'
import {store} from 'react-notifications-component'

interface Props{
    invite: Invite
    handleDelete: (id:string)=>void
}

export const OpenInvite:React.FC<Props> = (props)=>{
    const inv = props.invite

    const copyCode = (e:any)=>{
        // e.current.select()
        // document.execCommand('copy')
        navigator.clipboard.writeText(inv.code)

        store.addNotification({
            title: "😎😎Copied!",
            message: `The code ${inv.code} should be in your clipboard now.`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        })

    }

    return(
        <div className='card rounded bg-dark text-left mb-2'>
            <div className='card-header'>
                <div className='d-flex flex-row'>
                    <h4 className='col pl-0 align-self-center'
                        onClick={(e:any)=>copyCode(e)}
                    >
                        {inv.code}
                    </h4>
                    {/* <p className='col-lg-3'>
                    </p> */}
                    <div className='d-flex flex-column col px-0'>
                        <strong className='p-1'>Exp: {timeSince((inv.expires_at as Date).valueOf())}</strong>
                        <strong className='p-1'>{inv.uses_left} uses left</strong>
                    </div>

                    <div className='d-flex flex-column justify-content-between col pr-0'>
                        <button className='delete-button btn bg-secondary p-0 m-0 ml-auto' onClick={()=>{
                            props.handleDelete(inv.id)
                        }}>
                            <X className='m-0 pb-2' size={30} color='white'/>
                        </button>
                        <small className='ml-auto'>{timeSince((inv.created_at as Date).valueOf())} ago</small>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}
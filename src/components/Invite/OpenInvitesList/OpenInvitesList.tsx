import React, { useEffect, useState } from 'react'
import {FileEarmarkPlus} from 'react-bootstrap-icons'
import { isMobile } from 'react-device-detect'
import ReactModal from 'react-modal'
import { store } from 'react-notifications-component'
import {getInvites, deleteInvite, createInvite} from 'fbase'
import { Invite } from 'components/Props'
import { NewInviteForm } from './NewInviteForm'
import { OpenInvite } from './OpenInvite'
import './OpenInvitesList.sass'

interface Props{
    // getInvites: ()=>Array<any> //array? ????? ? ???
}
ReactModal.setAppElement('#root')
// ReactModal.defaultStyles = {}

export const OpenInvitesList:React.FC<Props> = (props)=>{
    // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content

    const [open,setOpen] = useState(false)
    const [openInvites,setOpenInvites] = useState<Invite[]>([])

    useEffect(()=>{
        (async()=>{
            const invites = await getInvites()
            setOpenInvites(invites)
        })()
    },[])

    const handleCreate = async(newInv:any)=>{
        
        let result = await createInvite(newInv.code,newInv.expires_after,newInv.num_of_uses)

        if(result instanceof Error){
            store.addNotification({
                title: "Uh oh! 😨",
                message: result.message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
        }else{
            store.addNotification({
                title: "Epic 😎😎😎",
                message: `A new invite with code ${result.code} has been created!`,
                type: "info",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })

            setOpenInvites([result, ...openInvites])
        }
    }

    const handleDelete = (id:string)=>{
        let newOIs:Invite[] = []

        for(let inv of openInvites){
            if(inv.id !== id)
                newOIs.push(inv)
            else
                deleteInvite(id)
        }
        setOpenInvites(newOIs)
    }

    return(
        <div className='card bg-transparent mb-3'>

            <div className='card-header d-flex'>
                <h4>Open Invites List</h4>

                <button className='btn btn-success ml-auto mr-0' onClick={()=>setOpen(!open)}>
                    <FileEarmarkPlus className='p-0 m-0' size={24} color='white'/>
                </button>

            </div>
            <div  className={isMobile ? 'card-body bg-transparent px-0': 'card-body bg-transparent'}>
                {openInvites.map((item, index)=>(
                    <OpenInvite key={index} handleDelete={handleDelete} invite={item} />
                ))}
            </div>

                <div className='modal'>
                    <ReactModal isOpen={open}
                            shouldCloseOnOverlayClick 
                            onRequestClose={()=>setOpen(false)}
                            className='Modal'
                            overlayClassName='Overlay'
                        >
                        <div className='modal-dialog modal-dialog-centered'>
                            <div className='modal-content bg-dark rounded'>
                                <div className='modal-header'>
                                    <h4 className='modal-title'>Pogg modal title</h4>
                                    <button className='close text-white' onClick={()=>setOpen(false)}><span aria-hidden="true">&times;</span></button>
                                </div>
                                <NewInviteForm setModalOpen={setOpen} handleCreate={handleCreate}/>
                            </div>
                        </div>
                    </ReactModal>
                </div>
        </div>
    )
}
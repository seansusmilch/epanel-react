import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { getInviteUses, deleteInviteUse } from 'fbase'
import { InviteUse } from 'components/Props'
import { UsedInvite } from './UsedInvite'
import './UsedInvitesList.sass'

export const UsedInvitesList:React.FC = (props)=>{

    const [invUses,setInvUses] = useState<InviteUse[]>([]) 

    useEffect(()=>{
        (async()=>{
            const inviteUses = await getInviteUses()
            // console.log(inviteUses)
            setInvUses(inviteUses)
        })()
    },[])

    const handleDelete = (id:string)=>{
        let newIUs:InviteUse[] = []
        for(let iu of invUses){
            if(iu.id !== id)
                newIUs.push(iu)
            else
                deleteInviteUse(id)
        }
        setInvUses(newIUs)
    }

    return (
        <div className='card bg-transparent mb-3'>

            <div className='card-header bg-transparent'>
                <h4>Used Invites Log</h4>
                {/* <div className='display-4'>Used Invites Log</div> */}
            </div>
            <div className={isMobile ? 'card-body bg-transparent px-0': 'card-body bg-transparent'}>
                {/* <div className='jumbotron bg-secondary'>
                    <h6>A log of invite uses. Complete with cool badges and dropdown things too that would be sick.</h6>
                </div> */}
                {invUses.map((item, index)=>(
                    <UsedInvite key={index} handleDelete={handleDelete} invite_use={item}/>
                ))}
                {/* <button className='btn btn-success' onClick={async()=>{
                    console.log(await getInviteUses())
                }}>Get invite uses</button> */}
            </div>
        </div>
    )
}
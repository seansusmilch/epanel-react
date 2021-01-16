import React,{useContext} from 'react'
import {InviteForm, OpenInvitesList, InviteInfo, UsedInvitesList} from './'
import {UserContext} from '../Auth'

interface Props{

}

export const InvitePage:React.FC<Props> = (props) => {

    const user = useContext(UserContext)

    return(
    <>
        <br/>
        <div className='jumbotron bg-dark p-3 text-center'>
            {/* <h1>Invite Page</h1> */}
            <div className='display-3'>Invite Page</div>
        </div>

        {/* <div className='d-flex justify-content-between flex-wrap'>
            <InviteForm/>
            <InviteInfo/>
            {user && user.isAdmin ? 
                <OpenInvitesList/>
                :
                ''
            }
            
        </div> */}

        <div className={user&&user.isAdmin? 'row': ''}>
            <div className={user && user.isAdmin ? 'col-lg-6':''}>
            {user && user.isAdmin ?
                <>
                    <div className='row-lg'>
                        <OpenInvitesList/>                  
                    </div>
                    <div className='row-lg'>
                        <UsedInvitesList/>
                    </div>
                </>
                :
                ''
            }
            </div>

            <div className={user&&user.isAdmin? 'col-lg-6':'row'}>
                
                <div className={user&&user.isAdmin? 'row-lg':'col-md'}>
                    <InviteForm/>
                </div>
                <div className={user&&user.isAdmin? 'row-lg':'col-md'}>
                    <InviteInfo/>
                </div>           
            </div>
        </div>
    </>
    )
}
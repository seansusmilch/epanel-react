import React from 'react'
import { InviteUse } from '../../Props'
import {timeSince} from '../../Helper'
import { Check, Exclamation, X } from 'react-bootstrap-icons'

interface Props{
    invite_use: InviteUse
    handleDelete: (id:string)=>void
}

export const UsedInvite:React.FC<Props> = (props)=>{
    const iuse = props.invite_use

    return(
        <div className='card rounded bg-dark text-left mb-2'>
            <div className='card-header d-flex flex-row'>
                <img className="mr-2 align-self-center" 
                    height={30} 
                    width={30} 
                    style={{
                        borderRadius: '100px'
                    }}
                    alt={iuse.used_by.name} 
                    src={iuse.used_by.picture}
                />
                <div className='iuse-name align-self-center'>{iuse.used_by.name}</div>
                <p className='ml-auto mr-2'>
                    
                </p>
                <div className='d-flex flex-column justify-content-between'>
                    <div className='d-flex flex-row'>
                        {iuse.emby_user.success ? 
                            <Check className='bdge bg-success p-0 m-0 ml-auto' size={25} color='white'/>
                            :
                            <Exclamation className='bdge bg-danger p-0 m-0 ml-auto' size={25} color='white'/>
                        }
                        <button className='delete-button btn bg-secondary p-0 m-0 ml-1' onClick={()=>{
                            props.handleDelete(iuse.id)
                        }}>
                            <X className='m-0 pb-2' size={30} color='white'/>
                        </button>
                    </div>
                    
                    <small className='pt-2'>{timeSince(iuse.used_at.valueOf())} ago</small>
                </div>
            </div>
            <div className='card-body'>
                {iuse.emby_user.success ? 
                
                    <table className='table bg-dark text-white'>
                        <tbody>
                            <tr>
                                <td>Connect</td>
                                <td>{iuse.emby_user.connect}</td>
                            </tr>
                            <tr>
                                <td>Username</td>
                                <td>{iuse.emby_user.username}</td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>{iuse.emby_user.password}</td>
                            </tr>
                        </tbody>
                    </table>
                
                :<>
                    <details className='pb-2'>
                        <summary className='bg-danger'>Errors</summary>
                        <ul className='list-group'>
                            {Object.entries(iuse.emby_user.err).map((kv:any,index)=>(
                                <li key={index} className='error-datails details-open list-group-item d-flex bg-danger'>
                                    <div>{kv[0]+':'}&nbsp;</div>
                                    <div>{kv[1]}</div>
                                </li>
                            ))}
                        </ul>
                    </details>
                    {/* <details className='pb-2'>
                        <summary className='bg-primary'>Text</summary>
                        <pre className='bg-primary details-open text-white'>{JSON.stringify(iuse,null,4)}</pre>
                    </details> */}
                </>
                }
                
            </div>
        </div>
    )
}
import React from 'react'
import {StatusProps} from '../../Props'

interface Props{ 
    message: string
    color: string
    announcement: string
}


export const StatusPreview: React.FC<Props> = (props:Props)=>{
    return(
        <div id='preview'>
            {/* <div id='status'>
                <h1>Status: <div className='align-top' id='status-text' style={{
                        backgroundColor: props.color
                    }}>
                    {props.message}
                    </div></h1>
            </div>
            <div id='announcement'>
                <p className='ml-auto mr-auto'>Announcement</p>
                <p id='announcement-text' className='bg-dark p-2'>{props.announcement}</p>
            </div> */}


            <div id="status">
                Status: 
                <div id="status-text" className='rounded' style={{ 
                    backgroundColor: props.color
                }}>
                    {props.message}
                </div>
            </div>
            <div id='announcement'>
                <p className='ml-auto mr-auto'>Announcement</p>
                <p id='announcement-text' className='bg-dark p-2 rounded'>{props.announcement}</p>
            </div>
        </div>
    )
}
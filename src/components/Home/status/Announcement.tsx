import React from "react"
import './Announcement.sass'
interface Props {
    announcement: string
}


export const Announcement: React.FC<Props> = (props)=>{
    return(
        <div className='announcement-full'>
            <p className='announcement-title'>Announcement</p>
            <p className="announcement-text bg-dark rounded">{props.announcement}</p>
        </div>
    )
}
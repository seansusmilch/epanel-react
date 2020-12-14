import React from 'react';
import { Announcement } from './Announcement';
import { ServerStatus } from './ServerStatus';
import "./section.css"

interface Props {
    statusColor: string,
    announcement: string,
    statusText: string,
}

export const StatusSection: React.FC<Props> = (props)=>{
    return(
    <div className="status-section container">
        <ServerStatus statusText={props.statusText} statusColor={props.statusColor} 
            lastUpdated={{auto:true,date:Date.parse('14 December, 2020, 10:10:00 UTC')}}
        />
        <Announcement announcement={props.announcement} />
    </div>
    )
    
}
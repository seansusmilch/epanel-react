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
        <ServerStatus statusText={props.statusText} statusColor={props.statusColor} />
        <Announcement announcement={props.announcement} />
    </div>
    )
    
}
import React from 'react';
import { Announcement } from './Announcement';
import { ServerStatus } from './ServerStatus';
import "./section.css"

interface Props {
    statusColor: string,
    announcement: string,
    statusText: string,
    lastUpdated: {
        auto: boolean
        time: number
    } | null
}

export const StatusSection: React.FC<Props> = (props)=>{

    console.log(props.lastUpdated)
    return(
    <div className="status-section container">
        <ServerStatus statusText={props.statusText} statusColor={props.statusColor} 
            lastUpdated={props.lastUpdated}
        />
        <Announcement announcement={props.announcement} />
    </div>
    )
    
}
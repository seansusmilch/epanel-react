import React from 'react';
import { Announcement } from './Announcement';
import { ServerStatus } from './ServerStatus';
import "./section.css"

interface Props {
    up: boolean,
    announcement: string,
    statusText: string,
}

export const StatusSection: React.FC<Props> = (props)=>{
    return(
    <div className="status-section container">
        <ServerStatus statusText={props.statusText} up={props.up} />
        <Announcement announcement={props.announcement} />
    </div>
    )
    
}
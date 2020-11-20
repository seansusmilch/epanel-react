import React from 'react'

interface Props {
    statusText: string,
    statusColor: string,
}

export const ServerStatus: React.FC<Props> = (props)=>{

    
    return(
    <div className="status">
        Status: 
        <div className="status-text" style={{ 
            backgroundColor: props.statusColor
        }}>
            {props.statusText}
        </div>
    </div>
    )
}
import React from 'react'

interface Props {
    statusText: string,
    up: boolean,
}

export const ServerStatus: React.FC<Props> = (props)=>{

    
    return(
    <div className="status">
        Status: 
        <div className="status-text" style={{ 
            backgroundColor: props.up ? 'green' : 'red'
        }}>
            {props.statusText}
        </div>
    </div>
    )
}
import React from "react"

interface Props {
    announcement: string
}


export const Announcement: React.FC<Props> = (props)=>{
    return(
        <div className="announcement-full">
            <p>Announcement</p>
            <p className="announcement-text bg-dark">{props.announcement}</p>
        </div>
    )
}
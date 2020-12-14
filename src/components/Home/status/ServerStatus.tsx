import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'

interface Props {
    statusText: string,
    statusColor: string,
    lastUpdated: {
        auto: boolean,
        time: number
    } | null
}

export const ServerStatus: React.FC<Props> = (props)=>{

    // const [displayTimestamp, setDisplayTimestamp] = useState(
    //     ((Date.now() - props.lastUpdated.date) / 1000) / 60 > 1?
    //     'block' : 'none'
    //     )
    const [opacityTimestamp, setOpacityTimestamp] = useState(
        props.lastUpdated && ((Date.now() - props.lastUpdated.time) / 1000) / 60 > 1 ?
        '1' : '1'
        )
    const [timestamp, setTimestamp] = useState('')

    const timeSince = (date:number)=>{

        var seconds = Math.floor((Date.now() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    useEffect(()=>{
        // console.log(timeSince(props.lastUpdated.date))
        if(props.lastUpdated){
            
            let timestamp = ''
            if(isMobile){
                timestamp += props.lastUpdated.auto ? 'Auto - ' : 'Manual - '
                timestamp += timeSince(props.lastUpdated.time) + ' ago'
            }else{
                timestamp += 'Last updated '
                timestamp += props.lastUpdated.auto ? 'automatically ' : 'manually '
                timestamp += timeSince(props.lastUpdated.time) + ' ago'
            }
        
            
            setTimestamp(timestamp)
        }
    },[props.lastUpdated])

    const onClick = ()=>{
        if(opacityTimestamp==='0')
            setOpacityTimestamp('100%')
        else 
            setOpacityTimestamp('0')
    }
    
    return(
    <div className='status-parent'>
    <div className="status" onClick={()=>onClick()}>
        Status: 
        <div className="status-text" style={{ 
            backgroundColor: props.statusColor
        }}>
            {props.statusText}
        </div>
    </div>
    <small 
        className='status-timestamp'
        style={{opacity:opacityTimestamp}}
        >{timestamp}</small>
    </div>
    )
}
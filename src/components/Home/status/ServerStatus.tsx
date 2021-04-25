import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {timeSince} from 'components/Helper'
import './ServerStatus.sass'

interface Props {
    statusText: string,
    statusColor: string,
    lastUpdated: {
        auto: boolean,
        time: number
    } | null
}

export const ServerStatus: React.FC<Props> = (props)=>{

    const [opacityTimestamp, setOpacityTimestamp] = useState(
        props.lastUpdated && ((Date.now() - props.lastUpdated.time) / 1000) / 60 > 1 ?
        '1' : '1'
        )
    const [timestamp, setTimestamp] = useState('')

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
    <div className='status-parenttext-center'>
        <div className='d-inline-block'>
            <div className="status" onClick={()=>onClick()}>
                Status: 
                <div className="status-text rounded mx-3" style={{ 
                    backgroundColor: props.statusColor
                }}>
                    {props.statusText}
                </div>
            </div>
            <small 
                className={isMobile ? 'status-timestamp mr-4' : 'status-timestamp'}
                style={{opacity:opacityTimestamp}}
                >{timestamp}</small>
        </div>
    </div>
    )
}
import React, {useState, useEffect} from 'react'
// import {Formik, Form, Field, ErrorMessage} from 'formik'
import {StatusProps} from '../../Props'
import {StatusForm} from './StatusForm'
import {StatusPreview} from './StatusPreview'
import './status.css'
interface Props {
    status: StatusProps
    handleSubmit: (values:any)=>Promise<any>
}

export const defaultStatus = {
    auto: {
        down_col: 'string',
        down_msg: 'string',
        up_col: 'string',
        up_msg: 'string',
        enabled: false
    },
    current: {
        announcement: 'string',
        status_col: 'string',
        status_msg: 'string'
    }
} as StatusProps
export const Status: React.FC<Props> = (props) => {

    const [auto,setAuto] = useState(props.status.auto.enabled)
    const [down_col, setDownCol] = useState(props.status.auto.down_col)
    const [down_msg, setDownMsg] = useState(props.status.auto.down_msg)
    const [up_col, setUpCol] = useState(props.status.auto.up_col)
    const [up_msg, setUpMsg] = useState(props.status.auto.up_msg)
    const [announcement, setAnn] = useState(props.status.current.announcement)
    const [status_col, setStatusCol] = useState(props.status.current.status_col)
    const [status_msg, setStatusMsg] = useState(props.status.current.status_msg)

    // const [color, setColor] = useState(props.current.status_col)
    // const [msg, setMsg] = useState(props.current.status_msg)
    // const [ann, setAnn] = useState(props.current.announcement)

    const [isUp,setIsUp] = useState(props.status.auto.enabled)

    const [preview, setPreview] = useState({
        message: status_msg,
        color: status_col,
        announcement: announcement
    })

    const status = {
        down_col: down_col,
        down_msg: down_msg,
        up_col: up_col,
        up_msg: up_msg,
        auto: auto,
        announcement: announcement,
        status_col: status_col,
        status_msg: status_msg
    }

    const changeStatus = {
        down_col: setDownCol,
        down_msg: setDownMsg,
        up_col: setUpCol,
        up_msg: setUpMsg,
        auto: setAuto,

        announcement: setAnn,
        status_col: setStatusCol,
        status_msg: setStatusMsg,

        isUp: setIsUp,

        submit: props.handleSubmit
    }

    // let msg = status_msg
    // let color = status_col
    // let ann = announcement

    useEffect(() => {
        console.log('poggers', isUp, preview)

        let newPreview = {...preview}
        newPreview.announcement = announcement
        if(auto){
            newPreview.message = isUp ? up_msg : down_msg
            newPreview.color = isUp ? up_col : down_col
        }else{
            newPreview.message = status_msg
            newPreview.color = status_col
        }

        setPreview(newPreview)
    },[auto,isUp,down_col,up_col,down_msg,up_msg,status_col,status_msg,announcement])

    return(
        <section>
            <h1>Status Section</h1>

            <StatusPreview
                {...preview}
            />

            <StatusForm
                set={changeStatus}
                isUp={isUp}
                status={status}
            />

        </section>
    )
}
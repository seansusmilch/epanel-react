import React from "react"
import {Status} from './Status/Status'

interface Props{
    getConfig: ()=>void //change
}

export const Config: React.FC<Props> = (props:Props) => {


    return (
        <div>
            <h1>Config Page</h1>
            <Status
                auto = {{
                    down_col: 'red',
                    down_msg: 'not poggers',
                    up_col: 'green',
                    up_msg: 'poggers',
                    enabled: true
                }}
                current= {{
                    announcement: 'even newer website oh shit',
                    status_col: 'green',
                    status_msg: 'poggies'
                }}
            />
        </div>
    )
}
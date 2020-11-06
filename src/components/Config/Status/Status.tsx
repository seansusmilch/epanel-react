import React, {useState, useEffect} from 'react'
// import {Formik, Form, Field, ErrorMessage} from 'formik'
import {StatusForm} from './StatusForm'

export interface StatusProps {
    auto: {
        down_col: string
        down_msg: string
        up_col: string
        up_msg: string
        enabled: boolean
    }
    current: {
        announcement: string
        status_col: string
        status_msg: string
    }
}

export const Status: React.FC<StatusProps> = (props: StatusProps) => {
    return(
        <div>
            <h1>Status Section</h1>

            {/* <div className="card bg-dark">
                <div className='card-header'>Preview
                    <div className="btn-group-append float-right">
                        Server is
                        <input type="checkbox" id="preview-switch" checked data-toggle="toggle" data-on='up' data-off='down'
                            data-onstyle='outline-success' data-offstyle='outline-danger' data-size='sm' />
                    </div>
                </div>

                <div className='card-body bg-transparent'>
                    The preview
                </div>

                <form action="" method="post">
                    <div className='card-header'>Automatic
                        <div className="btn-group-append float-right">
                            Poggies
                        </div>
                    </div>

                    <div className="card-body">
                        Up
                        <input type="text" className='form-control mb-2' />
                        <input type="text" className='form-control mb-2' />
                    </div>
                    <div className='card-header'>Current</div>
                    <div className='card-body'>
                        <input type="text" />
                    </div>
                </form>
            </div> */}

            <StatusForm
                auto= {props.auto}
                current= {props.current}
            />

        </div>
    )
}
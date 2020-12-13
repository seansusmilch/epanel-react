import React, { useState, useEffect } from 'react'
import {Formik, Form, Field, ErrorMessage, useField} from 'formik'
import {StatusProps} from '../../Props'
import './status.css'

import {store} from 'react-notifications-component'

interface Props {
    set:{

        down_col: (message:string)=>void,
        down_msg: (message:string)=>void,
        up_col: (message:string)=>void,
        up_msg: (message:string)=>void,
        auto: (e:boolean)=>void,

        announcement: (message:string)=>void,
        status_col: (message:string)=>void,
        status_msg: (message:string)=>void,

        isUp: (e:boolean)=>void
        
        submit: (values:any)=>Promise<any>
    }
    isUp:boolean
    status: {
        down_col: string,
        down_msg: string,
        up_col: string,
        up_msg: string,
        auto: boolean,
        announcement: string,
        status_col: string,
        status_msg: string
    }
}

export const StatusForm: React.FC<Props> = (props)=>{
    
    return(
        <Formik 
                initialValues={props.status}

                enableReinitialize

                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        props.set.submit(values)
                        setSubmitting(false)

                        store.addNotification({
                            title: "Pogu Champuuuu",
                            message: "Status messages have been updated!",
                            type: "success",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animate__animated", "animate__fadeIn"],
                            animationOut: ["animate__animated", "animate__fadeOut"],
                            dismiss: {
                              duration: 5000,
                              onScreen: true
                            }
                          })

                    }, 400);
                }}            
        >
                
                {( formik:any ) => (
                    <Form>
                        <div className='card bg-dark'>

                            <div className='card-header'>
                                <h5>
                                    <label htmlFor='automatic'>
                                        Automatic
                                    </label>
                                    <div className="btn-group-append float-right">
                                        <Field
                                            type='checkbox'
                                            name='auto'
                                            id='automatic'
                                            checked={props.status.auto}
                                            onChange={(e:any)=>props.set.auto(e.target.checked)}
                                        />
                                    </div>
                                </h5>
                                
                            </div>
                            <div className='card-body'>
                                <div className='form-row'>
                                    <div className='col'>
                                        <Field
                                            type='checkbox'
                                            name='isUp'
                                            id='isUp'
                                            className='mr-2'
                                            disabled={!props.status.auto}
                                            checked={props.isUp}
                                            onChange={()=>props.set.isUp(!props.isUp)}
                                        />
                                        <label htmlFor='isUp'>Server is up</label>
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-md'>
                                        <label htmlFor="">Up Msg</label>
                                        <Field type="text" 
                                            name="up_msg" 
                                            className='form-control form-control-lg mb-2' 
                                            disabled={!props.status.auto} 
                                            // onChange={handleChange}
                                            onBlur={(e:any) => props.set.up_msg(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-auto'>
                                        <label htmlFor="">Up Color</label>
                                        <Field type="text" 
                                            name="up_col" 
                                            className='form-control form-control-lg mb-2' 
                                            disabled={!props.status.auto} 
                                            onBlur={(e:any)=>props.set.up_col(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-md'>
                                        <label htmlFor="">Down Msg</label>
                                        <Field 
                                            type="text" 
                                            name="down_msg" 
                                            className='form-control form-control-lg mb-2'
                                            disabled={!props.status.auto} 
                                            onBlur={(e:any)=>props.set.down_msg(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-auto'>
                                        <label htmlFor="">Down Color</label>
                                        <Field 
                                            type="text" 
                                            name="down_col" 
                                            className='form-control form-control-lg mb-2' 
                                            disabled={!props.status.auto} 
                                            onBlur={(e:any)=>props.set.down_col(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='card-header'>
                                <h5>Current</h5>
                            </div>
                            <div className='card-body'>
                                <div className='form-row'>
                                    <div className='col-md'>
                                        <label htmlFor="">Msg</label>
                                        <Field 
                                            type='text' 
                                            name='status_msg' 
                                            className='form-control form-control-lg mb-2' 
                                            disabled={props.status.auto}
                                            onBlur={(e:any)=>props.set.status_msg(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-auto'>
                                        <label htmlFor="">Color</label>
                                        <Field 
                                            type='text' 
                                            name='status_col' 
                                            className='form-control form-control-lg mb-2' 
                                            disabled={props.status.auto}
                                            onBlur={(e:any)=>props.set.status_col(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='col-lg'>
                                        <label htmlFor="">Announcement</label>
                                        <Field 
                                            type='textarea' 
                                            name='announcement' 
                                            className='form-control form-control-lg mb-2'
                                            onBlur={(e:any)=>props.set.announcement(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <button type="submit" className='btn btn-primary btn-block btn-lg' disabled={formik.isSubmitting}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
    )
}
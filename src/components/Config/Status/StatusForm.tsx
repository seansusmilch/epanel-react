import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {StatusProps} from './Status'

export const StatusForm: React.FC<StatusProps> = (props)=>{
    return(
        <Formik 
                initialValues={{
                    down_col: props.auto.down_col,
                    down_msg: props.auto.down_msg,
                    up_col: props.auto.up_col,
                    up_msg: props.auto.up_msg,
                    auto: props.auto.enabled,

                    announcement: props.current.announcement,
                    status_col: props.current.status_col,
                    status_msg: props.current.status_msg
                }}

                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}            
            >
            
                
                {( isSubmitting:boolean ) => (
                    <Form>
                        Up
                        <Field type="text" name="up_msg" className='form-control mb-2'/>
                        <Field type="text" name="up_col" className='form-control mb-2'/>
                        Down
                        <Field type="text" name="down_msg" className='form-control mb-2'/>
                        <Field type="text" name="down_col" className='form-control mb-2'/>

                        <br/>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
    )
}
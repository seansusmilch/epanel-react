import React from 'react'
import {Formik, Form, Field} from 'formik'
import {randomString} from 'components/Helper'

interface Props{
    setModalOpen: (val:boolean)=>void
    handleCreate: (newInv:any)=>Promise<void>
}

export const NewInviteForm:React.FC<Props> = (props)=>{



    return(<Formik
    
        initialValues={{
            expires_after: 7*24*60,
            num_of_uses: 10
        }}

        onSubmit={(values:any, {setSubmitting})=>{
            setSubmitting(true)
            setTimeout(async()=>{

                const newInv = {
                    code: randomString(6),
                    ...values,
                }

                console.log(newInv)
                await props.handleCreate(newInv)                

                setSubmitting(false)
            }, 4000)
        }}
    >

        {(formik:any)=>(
            <Form>
                <div className='modal-body'>
                    <label htmlFor='expire_after'>Expire After</label>
                    <Field as='select' 
                            className='custom-select custom-select-lg mb-3 bg-dark text-white' 
                            name='expire_after' 
                            disabled={formik.isSubmitting}
                            value={7*24*60}
                            >
                        <option value={12*60}>12 hours</option>
                        <option value={1*24*60}>1 day</option>
                        <option value={3*24*60}>3 days</option>
                        <option value={7*24*60}>1 week</option>
                        <option value={14*24*60}>2 weeks</option>
                        <option value={365*24*60}>1 year</option>
                    </Field>

                    <label htmlFor='expire_after'>Max Number of Uses</label>
                    <Field as='select' 
                            className='custom-select custom-select-lg mb-3 bg-dark text-white' 
                            name='num_of_uses' 
                            disabled={formik.isSubmitting}
                            value={10}
                            >
                        {/* <option>No limit</option> */}
                        <option value={1}>1 use</option>
                        <option value={5}>5 uses</option>
                        <option value={10}>10 uses</option>
                        <option value={25}>25 uses</option>
                        <option value={50}>50 uses</option>
                        <option value={100}>100 uses</option>
                    </Field>
                
                </div>
                <div className='modal-footer'>
                    <button className='btn btn-secondary text-white' onClick={()=>props.setModalOpen(false)}>Cancel</button>
                    <button className='btn btn-success text-white' type='submit' disabled={formik.isSubmitting}>Add</button>
                </div>
            </Form>
        )}

    </Formik>)
}
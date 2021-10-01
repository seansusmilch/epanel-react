import React from 'react'
import {Formik, Form, Field} from 'formik'
import {funcUseInvite} from 'fbase'
import {store} from "react-notifications-component"
import {OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import {Info} from 'react-bootstrap-icons'

interface Props{
    // useInvite: ()=>number // returns useful code to indicate success or failure.

}
interface FormVals{
    invite_code: string,
    local_username: string,
    display_name: string
}

export const InviteForm:React.FC<Props> = (props) => {

    // const inv = async()=>{
    //     const res = await funcUseInvite({
    //         code: 'POGU',
    //         username: 'dangle',
    //         displayname: 'dangledickrick'
    //     })
    //     console.log(res.data)
    // }

    const handleSubmit = async(values:FormVals)=>{

        if(values.invite_code == '' 
                || values.local_username == ''
                || values.display_name == ''){
            store.addNotification({
                title: "Uh oh! 😨",
                message: 'Please fill out all the fields',
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            })
            return
        }

        let result = (await funcUseInvite({
            code: values.invite_code,
            username: values.local_username,
            displayname: values.display_name
        })).data

        console.log('result', result)
        
        /**
         * ERROR CODES
         * 
         * {}: successful
         * 
         * 1: invalid code
         * 2: expired code
         * 3: max number of uses
         * 
         * 4: invalid username
         * 5: invalid connect displayname
         * 6: emby server error
         * 
         * 7: server error?
         * 8: bad input data
         * 9: insufficient permissions
         */
        if(!(result instanceof Object)){
            let title,message = ''
            switch(result){
                case 1:
                    title = '❌ Invalid Code'
                    message = `The code ${values.invite_code} is invalid`
                    break
                case 2:
                    title = '⌚ Expired Code'
                    message = `The code ${values.invite_code} is expired`
                    break
                case 3:
                    title = '💀 Exceeded Max No. of Uses'
                    message = `The code ${values.invite_code} has exceeded the maximum number of uses`
                    break
                case 6:
                    title = '⚠ Emby Server Error'
                    message = 'Something went wrong with Emby. Please report this.'
                    break
                case 7: 
                case 8:
                case 9:
                    title = '❓ Huh?'
                    message = 'Something went wrong...'
                    break
                default:
                    title = '❓⁉⁉❔❓ HOW????'
                    message = 'How did you do this...'
                    break
            }
            
            store.addNotification({
                title: title,
                message: message,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            })
            return
        }

        if(result.err != {}){
            for(let [,val] of Object.entries(result.err)){
                store.addNotification({
                    title: '😭 Error',
                    message: val as string,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            }
        }

        if(result.success){
            store.addNotification({
                title: '😎 Epic',
                message: `Successfully invited ${values.display_name} to theserver`,
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
        }

    }


    return (
        <Formik
            initialValues={{
                invite_code: '',
                local_username: '',
                display_name: ''
            }}
            onSubmit={async(values:FormVals, {setSubmitting})=>{
                setSubmitting(true)

                console.log(values)
                
                await handleSubmit(values)
                
                setSubmitting(false)
            }}
        >
            {(formik:any)=>(
                <Form>
                    <div className='card bg-dark rounded mb-3'>

                        <div className='card-header bg-transparent'>
                            <h4 className='card-title'>Invite Form</h4>
                        </div>
                        <div className='card-body'>
                            <div className='form-row mb-3'>
                                <label 
                                    htmlFor="invite_code" 
                                    className='col-sm-3 col-form-label'
                                    >Invite Code</label>
                                <div className='col-sm-9'>
                                    <Field as='input' 
                                        name='invite_code' 
                                        className='form-control' 
                                        disabled={formik.isSubmitting}
                                        placeholder=''
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className='form-row mb-3'>
                                <label 
                                    htmlFor="local_username" 
                                    className='col-sm-3 col-form-label'
                                    >Username</label>
                                <div className='col-sm-9'>
                                    <Field as='input' 
                                        name='local_username' 
                                        className='form-control' 
                                        disabled={formik.isSubmitting} 
                                        placeholder='First name and last initial will do'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='form-row'>
                                <label 
                                    htmlFor="display_name" 
                                    className='col-sm-3 col-form-label'
                                    >DisplayName
                                        <OverlayTrigger
                                            placement='bottom'
                                            overlay={(props)=>
                                            <Tooltip id='button-tooltip' {...props}>
                                                This is the <u>Display Name</u> you chose when following the <code>How do I join?</code> steps.
                                            </Tooltip>}
                                        >
                                            <Button className='ml-2 py-1 px-2'><Info/></Button>
                                        </OverlayTrigger>    
                                </label>
                                <div className='col-sm-9'>
                                    <Field as='input' 
                                        name='display_name' 
                                        className='form-control' 
                                        disabled={formik.isSubmitting}
                                        placeholder='displayname you used to sign up with'
                                        required
                                    />
                                </div>
                            </div>                    
                        </div>
                        <div className='card-footer d-flex flex-row justify-content-end align-items-center'>
                            <button type='button' className='btn btn-secondary m-1'>Clear</button>
                            <button type='submit' className='btn btn-primary m-1' disabled={formik.isSubmitting}>Submit</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
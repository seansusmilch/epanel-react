import React, { useContext } from 'react';
// import './RutorrentLogin.css'

 import { Field, Form, Formik, FormikProps } from 'formik';
import { UserContext } from '../Auth';
import { Redirect } from 'react-router-dom';
 
 export const RutorrentLogin = () => {
    const user = useContext(UserContext)
    return (
        user?.isAdmin ?
//     <div className="wrapper fadeInDown">
//         <div id="formContent">
//             <div className="fadeIn first bg-dark">
//                 {/* <img src="https://minecraftsexy.website/logos/rutorrent-icon.webp" id="icon" alt="User Icon" height='64px' width='64px'/> */}
//                 <h2>ruTorrent</h2>
//             </div>
//             <Formik
//             initialValues={{username: '', password: ''}}
//             onSubmit={(values, actions) => {
//                 //  setTimeout(() => {
//                 // //    alert(JSON.stringify(values, null, 2));
//                 //     alert(document.location)
//                 //    actions.setSubmitting(false);
//                 //  }, 1000)'
                
//                 document.location.assign(`https://${values.username}:${values.password}@rt.minecraftsexy.website/`)
//             }}
//             >
//             {(props: FormikProps<any>) => (
//                 <Form className='bg-dark form'>
//                 <Field name="username"
//                         placeholder='username'
//                         type='text'
//                         id='login' 
//                         className='fadeIn second'
//                     />
//                 <Field name="password" type='password'
//                         placeholder='password'
//                         id='password'
//                         className='fadeIn third'
//                 />
//                 <button type="submit" className='fadeIn fourth'>Submit</button>
//                 </Form>
//             )}
//             </Formik>
//         </div>
//    </div>
    <div className='row justify-content-center text-center'>
        <div className='card bg-dark col-lg-4 mt-4'>
            <div className='card-header'>
                <h5 className='display-4'>ruTorrent</h5>
            </div>

            <div className='card-body'>
            <Formik
            initialValues={{username: '', password: ''}}
            onSubmit={(values, actions) => {
                //  setTimeout(() => {
                // //    alert(JSON.stringify(values, null, 2));
                //     alert(document.location)
                //    actions.setSubmitting(false);
                //  }, 1000)'
                
                document.location.assign(`https://${values.username}:${values.password}@rt.minecraftsexy.website/`)
            }}
            >
            {(props: FormikProps<any>) => (
                <Form className='bg-dark rounded'>
                <Field name="username"
                        placeholder='username'
                        type='text'
                        id='login' 
                        className='form-control form-control-lg my-2'
                    />
                <Field name="password" type='password'
                        placeholder='password'
                        id='password'
                        className='form-control form-control-lg my-2'
                />
                <button type="submit" className='btn btn-primary my-2 btn-block btn-lg'>Submit</button>
                </Form>
            )}
            </Formik>
            </div>
        </div>
        
    </div>
   :
   <Redirect to='/'/>
 )}
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { NavLink,useNavigate } from 'react-router-dom';
import {useFormik} from 'formik' 
import axios from 'axios';
import SigninSchema from '../../../../Schemas/SigninSchema'

import { login } from '../../../../Services/adminService';

const signin = () => {
  let navigate = useNavigate();
  let [msg, setMsg] = useState("")
  let [eye, setEye] = useState(false)
  let [showLoader, setShowLoader] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
    const [ admin, setAdmin ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const loginFun = useGoogleLogin({
      onSuccess: (codeResponse) => setAdmin(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });
  
  // useEffect(
  //     () => {
  //         if (admin) {
  //             axios
  //                 .get(`https://www.googleapis.com/oauth2/v1/admininfo?access_token=${admin.access_token}`, {
  //                     headers: {
  //                         Authorization: `Bearer ${admin.access_token}`,
  //                         Accept: 'application/json'
  //                     }
  //                 })
  //                 .then((res) => {
  //                     setProfile(res.data);
  //                 })
  //                 .catch((err) => console.log(err));
  //         }
  //     },
  //     [ admin ]
  // );
  let initialValues = {
    email: "",
    password: "",
  }


let {values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
  initialValues : initialValues,
  validationSchema : SigninSchema,
  onSubmit : async () => {
      try {
        setShowLoader(true)
        let result = await login(values);
        if(result.data.status === 200) {
          setShowAlert(false)
          localStorage.setItem('1001_ai_console_token', result.data.token)
          navigate('/admin/home')
          setShowLoader(false)

        }
        if(result.data.errType == 1) {
          setShowLoader(false)
          setShowAlert(true)
          setMsg("Username or Password is incorrect")
          setTimeout(() => {
            setShowAlert(false)
          }, 3000);
        }
        if(result.data.errType == 2) {
          setShowLoader(false)
          setShowAlert(true)
          setMsg("Username or Password is incorrect")
          setTimeout(() => {
            setShowAlert(false)
          }, 3000);
        }
        setShowLoader(false)
      } catch(error) {
        setShowLoader(true)
        setShowAlert(true)
        setMsg("Internal Server Error")
        setTimeout(() => {
            setShowAlert(false)
          }, 3000);
        console.log(error)
        setShowLoader(false)
      }


  }
})
  return (
    <>
<div>
  {/* App preloader*/}
  {/* <div className="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900">
    <div className="app-preloader-inner relative inline-block h-48 w-48" />
  </div> */}
  {/* Page Wrapper */}
  <div id="root" className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900" x-cloak>
    <div className="fixed top-0 hidden p-6 lg:block lg:px-12">
      <a href="#" className="flex items-center space-x-2">
        <img className="h-12 w-12" src="/assets/images/app-logo.svg" alt="logo" />
        <p className="text-xl font-semibold uppercase text-slate-700 dark:text-navy-100">
          lineone
        </p>
      </a>
    </div>
    <div className="hidden w-full place-items-center lg:grid">
      <div className="w-full max-w-lg p-6">
        <img className="w-full" x-show="!$store.global.isDarkModeEnabled" src="/assets/images/illustrations/dashboard-check.svg" alt="image" />
        <img className="w-full" x-show="$store.global.isDarkModeEnabled" src="/assets/images/illustrations/dashboard-check-dark.svg" alt="image" />
      </div>
    </div>
    <main className="flex w-full flex-col items-center bg-white dark:bg-navy-700 lg:max-w-md">
      <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
        <div className="text-center">
          <img className="mx-auto h-16 w-16 lg:hidden" src="/assets/images/app-logo.svg" alt="logo" />
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
              Welcome Back
            </h2>
            <p className="text-slate-400 dark:text-navy-300">
              Please sign in to continue
            </p>
          </div>
        </div>
        <div className="mt-16">
          <label className="relative flex">
            <input placeholder="Username" type="text" name='email' className={`form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 ${touched.email && errors.email ? "is-invalid" : ""}`} onChange={handleChange} onBlur={handleBlur} value={values.email}/>
            <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </label>
          <div className="flex items-center justify-between space-x-2">
            <div>{touched.email && errors.email ? (<small className='text-danger fw-500'>{errors.email}</small>) : null}</div>
          </div>
          <label className="relative mt-4 flex">
            <input placeholder="Password" type="password" name='password' className={`form-input peer w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 ${touched.password && errors.password ? "is-invalid" : ""}`} onChange={handleChange} onBlur={handleBlur} value={values.password}/>
            <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
          </label>
          <div className="flex items-center justify-between space-x-2">
            <div>{touched.password && errors.password ? (<small className='text-danger fw-500'>{errors.password}</small>) : null}</div>
          </div>
          <div className="mt-4 flex items-center justify-between space-x-2">
            <label className="inline-flex items-center space-x-2">
              <input className="form-checkbox is-outline h-5 w-5 rounded border-slate-400/70 bg-slate-100 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-500 dark:bg-navy-900 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent" type="checkbox" />
              <span className="line-clamp-1">Remember me</span>
            </label>
            <a href="#" className="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100">Forgot Password?</a>
          </div>
          <button type='submit' className="btn mt-10 h-10 w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
            Sign In
          </button>
          <div className="my-7 flex items-center space-x-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500" />
            <p>OR</p>
            <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500" />
          </div>
          <div className="flex space-x-4">
            <button className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90" onClick={()=> loginFun()}>
              <img className="h-5.5 w-5.5" src="/assets/images/logos/google.svg" alt="logo" />
              <span>Google</span>
            </button>
            <button className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <img className="h-5.5 w-5.5" src="/assets/images/logos/github.svg" alt="logo" />
              <span>Github</span>
            </button>
          </div>
        </div>

      </div>

{showAlert && (  <div className="alert flex overflow-hidden rounded-lg bg-error/10 text-error dark:bg-error/15">
  <div className="flex flex-1 items-center space-x-3 p-4">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
    <div className="flex-1">{msg}</div>
  </div>
  <div className="w-1.5 bg-error" />
</div>)}

      </form>
      <div className="my-5 flex justify-center text-xs text-slate-400 dark:text-navy-300">
        <a href="#">Privacy Notice</a>
        <div className="mx-3 my-1 w-px bg-slate-200 dark:bg-navy-500" />
        <a href="#">Term of service</a>
      </div>
    </main>
  </div>
  {/* 
  This is a place for Alpine.js Teleport feature 
  @see https://alpinejs.dev/directives/teleport
*/}
  <div id="x-teleport-target" />
</div>

    </>
  )
}

export default signin
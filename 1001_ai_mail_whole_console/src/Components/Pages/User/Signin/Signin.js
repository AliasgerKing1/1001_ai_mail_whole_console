/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { NavLink,useNavigate } from 'react-router-dom';
import {useFormik} from 'formik' 
import axios from 'axios';
import SigninSchema from '../../../../Schemas/SigninSchema'

import { login } from '../../../../Services/userService';
import ErrorAlert from '../../../Shared/Alerts/ErrorAlert'
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
          localStorage.setItem('1001_ai_console_user_token', result.data.token)
          navigate('/auth/skmail')
          setShowLoader(false)

        }
        if(result.data.errType == 1) {
          setShowLoader(false)
          setShowAlert(true)
          setMsg("Email or Password is incorrect")
          setTimeout(() => {
            setShowAlert(false)
          }, 3000);
        }
        if(result.data.errType == 2) {
          setShowLoader(false)
          setShowAlert(true)
          setMsg("Email or Password is incorrect")
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
  <div x-data className="is-header-blur" x-bind="$store.global.documentBody">
  {/* App preloader*/}
  {/* <div className="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900">
    <div className="app-preloader-inner relative inline-block h-48 w-48" />
  </div> */}
  {/* Page Wrapper */}
  <div id="root" className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900" x-cloak>
    <main className="grid w-full grow grid-cols-1 place-items-center">
      <div className="w-full max-w-[26rem] p-4 sm:px-5">
        <div className="text-center">
          <img className="mx-auto h-16 w-16" src="/assets/images/app-logo.svg" alt="logo" />
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
              Welcome Back
            </h2>
            <p className="text-slate-400 dark:text-navy-300">
              Please sign in to continue
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="card mt-5 rounded-lg p-5 lg:p-7">
          <label className="block">
            <span>email:</span>
            <span className="relative mt-1.5 flex">
              <input className={`form-input peer w-full rounded-lg border bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent ${errors.email && touched.email ? "border-error" : "border-slate-300"}`} placeholder="Email" type="text" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
              <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </span>
          </label>
          <div classname='text-align-left'>{errors.email && touched.email ? (<small className='text-danger'>{errors.email}</small>) : null}</div>
          <label className="mt-4 block">
            <span>Password:</span>
            <span className="relative mt-1.5 flex">
              <input className={`form-input peer w-full rounded-lg border bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent ${errors.password && touched.password ? "border-error" : "border-slate-300"}`}  placeholder="Password" type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
              <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </span>
          </label>
          <div classname='text-align-left'>{errors.password && touched.password ? (<small className='text-danger'>{errors.password}</small>) : null}</div>
          <div className="mt-4 flex items-center justify-between space-x-2">
            <label className="inline-flex items-center space-x-2">
              <input className="form-checkbox is-basic h-5 w-5 rounded border-slate-400/70 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent dark:focus:border-accent" type="checkbox" />
              <span className="line-clamp-1">Remember me</span>
            </label>
            <a href="#" className="text-xs text-slate-400 transition-colors line-clamp-1 hover:text-slate-800 focus:text-slate-800 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100">Forgot Password?</a>
          </div>
          <button type='submit' className="btn mt-5 w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
            Sign In
          </button>
        {showAlert && <ErrorAlert msg={msg} />}
          <div className="mt-4 text-center text-xs+">
            <p className="line-clamp-1">
              <span>Dont have Account?</span>
              <a className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent" href="pages-singup-1.html"> Create account</a>
            </p>
          </div>
          <div className="my-7 flex items-center space-x-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500" />
            <p>OR</p>
            <div className="h-px flex-1 bg-slate-200 dark:bg-navy-500" />
          </div>
          <div className="flex space-x-4">
            <button type='button' className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <img className="h-5.5 w-5.5" src="/assets/images/logos/google.svg" alt="logo" />
              <span>Google</span>
            </button>
            <button type='button' className="btn w-full space-x-3 border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <img className="h-5.5 w-5.5" src="/assets/images/logos/github.svg" alt="logo" />
              <span>Github</span>
            </button>
          </div>
        </div>
        </form>
        <div className="mt-8 flex justify-center text-xs text-slate-400 dark:text-navy-300">
          <a href="#">Privacy Notice</a>
          <div className="mx-3 my-1 w-px bg-slate-200 dark:bg-navy-500" />
          <a href="#">Term of service</a>
        </div>
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

    /* eslint-disable */
import React, {useEffect} from 'react'
import {useRoutes, Navigate} from 'react-router-dom'
import authRoutes from './authRoutes'
import adminRoutes from './adminRoutes'
import Layouts from '../Layouts/Layouts'
import axios from 'axios'
import {email_user_api, email_developer_api} from '../Content/Api/email'

import Signin from '../Components/Pages/Admin/Signin/Signin'
import Signup from '../Components/Pages/User/Signup/Signup'
import SigninUser from '../Components/Pages/User/Signin/Signin'
const Router = () => {
    let createComponentFun = async () => {
        await axios.post("http://127.0.0.1:5000/create/component", email_user_api)
        // await axios.post("http://127.0.0.1:5000/create/component", email_developer_api)
    }
    useEffect(() => {
        createComponentFun()
    }, [])
    let isTokenPresent = () => {
        const token = localStorage.getItem('1001_ai_console_token');
        if(token) {
            return true
        } else {
            return false
        }
}
    let isUserTokenPresent = () => {
        const token = localStorage.getItem('1001_ai_console_user_token');
        if(token) {
            return true
        } else {
            return false
        }
}
    const router = useRoutes([
        {
            path : '/',
            element : isTokenPresent() ? (
                <Navigate to="/admin/home" replace />
            ) : (<Signin />)
            },
        {
            path : '/signup',
            element : isUserTokenPresent() ? (
                <Navigate to="/auth/skmail" replace />
            ) : (<Signup />)
            },
        {
            path : '/signin',
            element : isUserTokenPresent() ? (
                <Navigate to="/auth/skmail" replace />
            ) : (<SigninUser />)
            },
            {
                path : '/auth',
                element : <Layouts />,
                children : authRoutes
                },
            {
                path : '/admin',
                element : <Layouts />,
                children : adminRoutes
                },
    ])
  return (router)
}

export default Router

import React from 'react'
import {useRoutes, Navigate} from 'react-router-dom'
import authRoutes from './authRoutes'
import adminRoutes from './adminRoutes'
import Layouts from '../Layouts/Layouts'

import Signin from '../Components/Pages/Admin/Signin/Signin'
import Signup from '../Components/Pages/User/Signup/Signup'
import SigninUser from '../Components/Pages/User/Signin/Signin'
const Router = () => {
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

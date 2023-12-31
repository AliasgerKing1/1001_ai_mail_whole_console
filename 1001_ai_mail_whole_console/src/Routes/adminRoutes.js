import React, { Suspense } from 'react';
import Home from '../Components/Pages/Admin/Home/Home'
import EmailApi from '../Components/Pages/Admin/Api/EmailApi'
import EditSignupPage from '../Components/Pages/Admin/EditPages/EditSignupPage'
import {email_user_api} from '../Content/Api/email'
import AuthProvider from '../Components/Pages/Admin/OAuthBySkMail/AuthProvider'

// Create an object where the keys are component names and the values are lazy-loaded components
const components = Object.fromEntries(
    email_user_api.map(({ ComponentName }) => [
      ComponentName,
      React.lazy(() => import(`../Components/Pages/Admin/Email-Api/${ComponentName}/${ComponentName}`)),
    ])
  );

const adminRoutes = [
    {
        path : "home",
        element : <Home />
    },
    {
        path : "api/email",
        element : <EmailApi />
    },
    {
        path : "edit/signup",
        element : <EditSignupPage />
    },
    {
      path : "demo/oAuth",
      element : <AuthProvider />
  },
    {
        path: 'api',
        children: [
          {
            path: '',
          },
          ...email_user_api.map((api) => ({
            path: api.path,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                {React.createElement(components[api.ComponentName])}
              </Suspense>
            ),
          })),
        ],
      },
]

export default adminRoutes
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from'react-redux'
import {configureStore, combineReducers} from '@reduxjs/toolkit'
import adminReducer from './Redux/AdminReducer'
import userReducer from './Redux/UserReducer'

let rootReducer = combineReducers({
    adminReducer,
    userReducer
  })
  
  let store = configureStore({
      reducer : rootReducer
    })
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<GoogleOAuthProvider
    clientId="22352471051-nmb00ujkoajleo1gkha4obl72cp7elra.apps.googleusercontent.com">
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> 
</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

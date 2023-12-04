/* eslint-disable */
import React, {useState} from 'react'
import {NavLink } from 'react-router-dom'
import {email_user_api,email_developer_api} from '../../Content/Api/email'
import {useDispatch, useSelector} from 'react-redux'
import {userSidebarTabRed} from '../../Redux/UserSidebarTabReducer'
const MainSidebar = () => {
  let dispatch = useDispatch()
  let state = useSelector(state=> state.userReducer)
  let state2 = useSelector(state=> state.userSidebarTabReducer)
  let [profile, setProfile] = useState(false)
  let [tabSelected, setTabSelected] = useState(1)
  let [dropdown, setDropdown] = useState({
    email_user : {
      state : false,
      item : 1
    },
    email_developer : {
      state : false,
      item : 1
    },
  })
  return (
    <>
                  <div className="main-sidebar">
              <div className="flex h-full w-full flex-col items-center border-r border-slate-150 bg-white dark:border-navy-700 dark:bg-navy-800">
                {/* Application Logo */}
                <div className="flex pt-4" onClick={()=> setProfile(false)}>
                  <NavLink to="/admin/home">
                    <img className="h-11 w-11 transition-transform duration-500 ease-in-out hover:rotate-[360deg]" src="/assets/images/app-logo.svg" alt="logo" />
                  </NavLink>
                </div>
                {/* Main Sections Links */}
                <div className="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto pt-6" onClick={()=> setProfile(false)}>
                  {/* Dashobards */}
                  <a className={`flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 dark:hover:bg-navy-450 dark:focus:bg-navy-450 cursor-poniter ${state2 === 1 ? "bg-primary/10 text-primary active:bg-primary/25 dark:bg-navy-600 dark:text-accent-light dark:active:bg-navy-450/90" : ""}`} onClick={()=> dispatch(userSidebarTabRed(1))}>
                    <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" fillOpacity=".3" d="M5 14.059c0-1.01 0-1.514.222-1.945.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601.32 0 .601.2 1.162.601l4.163 2.974c.821.586 1.232.88 1.453 1.31.222.43.222.935.222 1.945V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19v-4.94Z" />
                      <path fill="currentColor" d="M3 12.387c0 .267 0 .4.084.441.084.041.19-.04.4-.204l7.288-5.669c.59-.459.885-.688 1.228-.688.343 0 .638.23 1.228.688l7.288 5.669c.21.163.316.245.4.204.084-.04.084-.174.084-.441v-.409c0-.48 0-.72-.102-.928-.101-.208-.291-.355-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688-.343 0-.638.23-1.228.688l-7 5.445c-.379.295-.569.442-.67.65-.102.208-.102.448-.102.928v.409Z" />
                      <path fill="currentColor" d="M11.5 15.5h1A1.5 1.5 0 0 1 14 17v3.5h-4V17a1.5 1.5 0 0 1 1.5-1.5Z" />
                      <path fill="currentColor" d="M17.5 5h-1a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                  </a>
                  {/* Elements */}
                  <NavLink to="/auth/skmail" className={`flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 dark:hover:bg-navy-450 dark:focus:bg-navy-450 cursor-poniter ${state2 === 2 ? "bg-primary/10 text-primary active:bg-primary/25 dark:bg-navy-600 dark:text-accent-light dark:active:bg-navy-450/90" : ""}`} onClick={()=> dispatch(userSidebarTabRed(2))}>
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3111 14.75H5.03356C3.36523 14.75 2.30189 12.9625 3.10856 11.4958L5.24439 7.60911L7.24273 3.96995C8.07689 2.45745 10.2586 2.45745 11.0927 3.96995L13.1002 7.60911L14.0627 9.35995L15.2361 11.4958C16.0427 12.9625 14.9794 14.75 13.3111 14.75Z" fill="currentColor" />
                      <path fillOpacity="0.3" d="M21.1667 15.2083C21.1667 18.4992 18.4992 21.1667 15.2083 21.1667C11.9175 21.1667 9.25 18.4992 9.25 15.2083C9.25 15.0525 9.25917 14.9058 9.26833 14.75H13.3108C14.9792 14.75 16.0425 12.9625 15.2358 11.4958L14.0625 9.36C14.4292 9.28666 14.8142 9.25 15.2083 9.25C18.4992 9.25 21.1667 11.9175 21.1667 15.2083Z" fill="currentColor" />
                    </svg>
                  </NavLink>
                </div>
                {/* Bottom Links */}
                <div className="flex flex-col items-center space-y-3 py-3">
                  {/* Settings */}
                  <NavLink to="/auth/setting" className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25" onClick={()=> setProfile(false)}>
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillOpacity="0.3" fill="currentColor" d="M2 12.947v-1.771c0-1.047.85-1.913 1.899-1.913 1.81 0 2.549-1.288 1.64-2.868a1.919 1.919 0 0 1 .699-2.607l1.729-.996c.79-.474 1.81-.192 2.279.603l.11.192c.9 1.58 2.379 1.58 3.288 0l.11-.192c.47-.795 1.49-1.077 2.279-.603l1.73.996a1.92 1.92 0 0 1 .699 2.607c-.91 1.58-.17 2.868 1.639 2.868 1.04 0 1.899.856 1.899 1.912v1.772c0 1.047-.85 1.912-1.9 1.912-1.808 0-2.548 1.288-1.638 2.869.52.915.21 2.083-.7 2.606l-1.729.997c-.79.473-1.81.191-2.279-.604l-.11-.191c-.9-1.58-2.379-1.58-3.288 0l-.11.19c-.47.796-1.49 1.078-2.279.605l-1.73-.997a1.919 1.919 0 0 1-.699-2.606c.91-1.58.17-2.869-1.639-2.869A1.911 1.911 0 0 1 2 12.947Z" />
                      <path fill="currentColor" d="M11.995 15.332c1.794 0 3.248-1.464 3.248-3.27 0-1.807-1.454-3.272-3.248-3.272-1.794 0-3.248 1.465-3.248 3.271 0 1.807 1.454 3.271 3.248 3.271Z" />
                    </svg>
                  </NavLink>
                  {/* Profile */}
                  <div className="flex">
  <button className="avatar h-12 w-12" onClick={()=> setProfile(!profile)}>
    <img className="rounded-full" src="/assets/images/avatar/avatar-12.jpg" alt="avatar" />
    <span className="absolute right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-success dark:border-navy-700" />
  </button>
  <div  className={`popper-root fixed ${profile === true ? "show" : ""}`} data-popper-placement="right-end" style={{position: 'fixed', inset: 'auto auto 0px 0px', margin: 0, transform: 'translate(76px, -20px)'}}><div className="popper-box w-64 rounded-lg border border-slate-150 bg-white shadow-soft dark:border-navy-600 dark:bg-navy-700">
      <div className="flex items-center space-x-4 rounded-t-lg bg-slate-100 py-5 px-4 dark:bg-navy-800">
        <div className="avatar h-14 w-14">
          <img className="rounded-full" src="/assets/images/avatar/avatar-12.jpg" alt="avatar" />
        </div>
        <div>
          {state.length === 0 ? (
<h2>hiiii</h2>

                ) : (          <a href="#" className="text-base font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light">
            {state?.email}
          </a>)}
          <p className="text-xs text-slate-400 dark:text-navy-300">
          {state?.fname}&nbsp;{state?.lname}
          </p>
        </div>
      </div>
      <div className="flex flex-col pt-2 pb-5">
        <a href="#" className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
              Profile
            </h2>
            <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
              Your profile setting
            </div>
          </div>
        </a>
        <a href="#" className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
              Messages
            </h2>
            <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
              Your messages and tasks
            </div>
          </div>
        </a>
        <a href="#" className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
              Team
            </h2>
            <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
              Your team activity
            </div>
          </div>
        </a>
        <a href="#" className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-error text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
              Activity
            </h2>
            <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
              Your activity and events
            </div>
          </div>
        </a>
        <NavLink href="#" className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
              Settings
            </h2>
            <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
              Webapp settings
            </div>
          </div>
        </NavLink>
        <div className="mt-3 px-4">
          <button className="btn h-9 w-full space-x-2 bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

                </div>
              </div>
            </div>


           {/* Sidebar Panel */}
           <div className="sidebar-panel" style={{display : 'none'}} onClick={()=> setProfile(false)}>
            {/* dashboard Sidebar */}
            <div className="flex h-full grow flex-col bg-white pl-[var(--main-sidebar-width)] dark:bg-navy-750" style={{display : state2 === 2 && 'none' }}>
                {/* Sidebar Panel Header */}
                <div className="flex h-18 w-full items-center justify-between pl-4 pr-1">
                  <p className="text-base tracking-wider text-slate-800 dark:text-navy-100">
                    Dashboards
                  </p>
                  <button className="btn h-7 w-7 rounded-full p-0 text-primary hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-accent-light/80 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 xl:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                {/* Sidebar Panel Body */}
                <div x-data="{expandedItem:null}" className="h-[calc(100%-4.5rem)] overflow-x-hidden pb-6" x-init="$el._x_simplebar = new SimpleBar($el);">
                  <ul className="flex flex-1 flex-col px-4 font-inter">
                    <li>
                      <a x-data="navLink" href="index-2.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        CRM Analytics
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-orders.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Orders
                      </a>
                    </li>
                  </ul>
                  <div className="my-3 mx-4 h-px bg-slate-200 dark:bg-navy-500" />
                  <ul className="flex flex-1 flex-col px-4 font-inter">
                    <li x-data="accordionItem('menu-item-1')">
                      <a className="flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out" href="javascript:void(0);">
                        <span>Cryptocurrency</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <ul x-collapse x-show="expanded">
                        <li>
                          <a x-data="navLink" href="dashboards-crypto-1.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4">
                            <div className="flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                              <span>Cryptocurrency v1</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a x-data="navLink" href="dashboards-crypto-2.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4">
                            <div className="flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                              <span>Cryptocurrency v2</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li x-data="accordionItem('menu-item-2')">
                      <a className="flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out" href="javascript:void(0);">
                        <span>Banking</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <ul x-collapse x-show="expanded">
                        <li>
                          <a x-data="navLink" href="dashboards-banking-1.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4">
                            <div className="flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                              <span>Banking v1</span>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a x-data="navLink" href="dashboards-banking-2.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4">
                            <div className="flex items-center space-x-2">
                              <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                              <span>Banking v2</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-personal.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Personal
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-cms-analytics.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        CMS Analytics
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-influencer.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Influencer
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-travel.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Travel
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-teacher.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Teacher
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-education.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Education
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-authors.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Authors
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-doctor.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Doctors
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-employees.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Employees
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-workspace.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Workspaces
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-meeting.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Meetings
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-project-boards.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Project Boards
                      </a>
                    </li>
                  </ul>
                  <div className="my-3 mx-4 h-px bg-slate-200 dark:bg-navy-500" />
                  <ul className="flex flex-1 flex-col px-4 font-inter">
                    <li>
                      <a x-data="navLink" href="dashboards-widget-ui.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Widget UI
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="dashboards-widget-contacts.html" className="flex py-2 text-xs+ tracking-wide outline-none transition-colors duration-300 ease-in-out">
                        Widget Contacts
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* ApiLinks Sidebar */}
         <div className="flex h-full grow flex-col bg-white pl-[var(--main-sidebar-width)] dark:bg-navy-750" onClick={()=> setProfile(false)} style={{display : state2 === 3 && 'none' }}>
  {/* Sidebar Panel Header */}
  <div className="flex h-18 w-full items-center justify-between pl-4 pr-1">
    <p className="text-base tracking-wider text-slate-800 dark:text-navy-100">
      Api
    </p>
    <button className="btn h-7 w-7 rounded-full p-0 text-primary hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-accent-light/80 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 xl:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </div>
  {/* Sidebar Panel Body */}
  <div x-data="{expandedItem:'menu-item-3'}" className="h-[calc(100%-4.5rem)] overflow-x-hidden pb-6 simplebar-scrollable-y" x-init="$el._x_simplebar = new SimpleBar($el);" data-simplebar="init"><div className="simplebar-wrapper" style={{margin: '0px 0px -24px'}}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div><div className="simplebar-mask"><div className="simplebar-offset" style={{right: 0, bottom: 0}}><div className="simplebar-content-wrapper" tabIndex={0} role="region" aria-label="scrollable content" style={{height: '100%', overflow: 'hidden scroll'}}><div className="simplebar-content" style={{padding: '0px 0px 24px'}}>
              <ul className="flex flex-1 flex-col px-4 font-inter">
                <li x-data="accordionItem('menu-item-1')">
                  <a className={`flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out text-slate-600 dark:text-navy-200 hover:text-slate-800 dark:hover:text-navy-50 cursor-pointer ${dropdown.email_user.state === true ? "text-slate-800 font-semibold dark:text-navy-50" : ""}`} onClick={() => setDropdown(prevState => ({
    ...prevState,
    email_user: {
        ...prevState.email_user,
        state: !prevState.email_user.state
    }
}))}
>
                    <span>Email User</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ease-in-out ${dropdown.email_user.state ? "rotate-90" : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul x-collapse x-show="expanded" style={{display: dropdown.email_user.state === true ? '' : 'none', height: dropdown.email_user.state === true ? 'auto' : '', overflow: dropdown.email_user.state === true ? '' : 'hidden'}}>
                    {email_user_api?.map((email_item) => (
                                          <li>
                                          <NavLink to={`/admin/api/${email_item?.path}`} x-data="navLink" className={`flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 cursor-pointer  ${dropdown.email_user.item === email_item?.state ? "font-medium text-primary dark:text-accent-light" : "text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50" }`} onClick={() => setDropdown(prevState => ({
                        ...prevState,
                        email_user: {
                            ...prevState.email_user,
                            item: email_item?.state
                        }
                    }))}>
                                            <div className="flex items-center space-x-2">
                                              <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                                              <span>{email_item?.text}</span>
                                            </div>
                                          </NavLink>
                                        </li>
                    ))}
                  </ul>
                </li>
                <li x-data="accordionItem('menu-item-2')">
                  <a className={`flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out text-slate-600 dark:text-navy-200 hover:text-slate-800 dark:hover:text-navy-50 cursor-pointer ${dropdown.email_developer.state === true ? "text-slate-800 font-semibold dark:text-navy-50" : ""}`} onClick={() => setDropdown(prevState => ({
    ...prevState,
    email_developer: {
        ...prevState.email_developer,
        state: !prevState.email_developer.state
    }
}))}
>
                    <span>Email Developer</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ease-in-out ${dropdown.email_developer.state ? "rotate-90" : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul x-collapse x-show="expanded" style={{display: dropdown.email_developer.state === true ? '' : 'none', height: dropdown.email_developer.state === true ? 'auto' : '', overflow: dropdown.email_developer.state === true ? '' : 'hidden'}}>
                  {email_developer_api?.map((email_item) => (
                                          <li>
                                          <a x-data="navLink" className={`flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 cursor-pointer  ${dropdown.email_developer.item === email_item?.state ? "font-medium text-primary dark:text-accent-light" : "text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50" }`} onClick={() => setDropdown(prevState => ({
                        ...prevState,
                        email_developer: {
                            ...prevState.email_developer,
                            item: email_item?.state
                        }
                    }))}>
                                            <div className="flex items-center space-x-2">
                                              <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                                              <span>{email_item?.text}</span>
                                            </div>
                                          </a>
                                        </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div className="my-3 mx-4 h-px bg-slate-200 dark:bg-navy-500" />
              <ul className="flex flex-1 flex-col px-4 font-inter">
                <li x-data="accordionItem('menu-item-7')">
                  <a className="flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out text-slate-600 dark:text-navy-200 hover:text-slate-800 dark:hover:text-navy-50" href="javascript:void(0);">
                    <span>Sign In</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul x-collapse x-show="expanded" style={{display: 'none', height: 0, overflow: 'hidden'}} hidden>
                    <li>
                      <a x-data="navLink" href="pages-login-1.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Sign In 1</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-login-2.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Sign In 2</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li x-data="accordionItem('menu-item-8')">
                  <a className="flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out text-slate-600 dark:text-navy-200 hover:text-slate-800 dark:hover:text-navy-50" href="javascript:void(0);">
                    <span>Sign Up</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul x-collapse x-show="expanded" style={{display: 'none', height: 0, overflow: 'hidden'}} hidden>
                    <li>
                      <a x-data="navLink" href="pages-singup-1.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Sign Up 1</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-singup-2.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Sign Up 2</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="my-3 mx-4 h-px bg-slate-200 dark:bg-navy-500" />
              <ul className="flex flex-1 flex-col px-4 font-inter">
                <li x-data="accordionItem('menu-item-9')">
                  <a className="flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out text-slate-600 dark:text-navy-200 hover:text-slate-800 dark:hover:text-navy-50" href="javascript:void(0);">
                    <span>Error</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul x-collapse x-show="expanded" style={{display: 'none', height: 0, overflow: 'hidden'}}>
                    <li>
                      <a x-data="navLink" href="pages-error-404-1.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 404 v1</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-error-404-2.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 404 v2</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-error-404-3.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 404 v3</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-error-404-4.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 404 v4</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-error-401.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 401</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-error-429.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 429</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-error-500.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Error 500</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li x-data="accordionItem('menu-item-10')">
                  <a className="flex items-center justify-between py-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out text-slate-600 dark:text-navy-200 hover:text-slate-800 dark:hover:text-navy-50" href="javascript:void(0);">
                    <span>Starter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 transition-transform ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <ul x-collapse x-show="expanded" style={{display: 'none', height: 0, overflow: 'hidden'}} hidden>
                    <li>
                      <a x-data="navLink" href="pages-starter-1.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Blurred Header</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-starter-2.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Unblurred Header</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-starter-3.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Centered Links</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-starter-4.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Minimal Sidebar</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-starter-5.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Horizontal Navigation</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a x-data="navLink" href="pages-starter-6.html" className="flex items-center justify-between p-2 text-xs+ tracking-wide outline-none transition-[color,padding-left] duration-300 ease-in-out hover:pl-4 text-slate-600 hover:text-slate-900 dark:text-navy-200 dark:hover:text-navy-50">
                        <div className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full border border-current opacity-40" />
                          <span>Sideblock</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div></div></div></div><div className="simplebar-placeholder" style={{width: 240, height: 652}} /></div><div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}><div className="simplebar-scrollbar" style={{width: 0, display: 'none'}} /></div><div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}><div className="simplebar-scrollbar" style={{height: 167, display: 'block', transform: 'translate3d(0px, 0px, 0px)'}} /></div></div>
</div>

            </div>
    </>
  )
}

export default MainSidebar

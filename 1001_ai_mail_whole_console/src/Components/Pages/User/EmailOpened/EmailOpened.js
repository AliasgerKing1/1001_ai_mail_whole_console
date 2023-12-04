/* eslint-disable */
import React, {useState, useEffect, useRef } from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import Header from '../../../Shared/Header'
import {useDispatch, useSelector} from 'react-redux'
import {getUserData} from '../../../../Services/userService'
import {UserDataRed} from '../../../../Redux/UserReducer'
import MainSidebar from '../../../Shared/MainSidebar'
import {getReceiver} from '../../../../Services/userSkService'
import {sendEmail, getSendedEmail} from '../../../../Services/emailService'
import SingleEmail from '../../../Shared/SingleEmail'
const Email = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let state = useSelector(state=> state.userReducer)
  let state2 = useSelector(state=> state.userSidebarTabReducer)
  let [message, setMessage] = useState(false)
  let [receiver, setReceiver] = useState([])
  let [currentEmail, setCurrentEmail] = useState("")
  let [currentTab, setCurrentTab] = useState(1)
  let [sentEmail, setSentEmail] = useState([])
  let [composeEmail, setComposeEmail] = useState({
    receiver_email : "",
    message : "Hello there! I hope this message finds you well. I wanted to take a moment to express my gratitude for your continuous support and cooperation. Your dedication and hard work have played a significant role in our success, and it’s important to acknowledge that none of this would have been possible without your efforts. As we continue to grow and face new challenges, I am confident that with your commitment, we will achieve even greater heights. Thank you once again for your outstanding contribution. Looking forward to more successful endeavors together. Best regards."
  })
  let [dropdownCon, setDropdownCon] = useState(false)
  let [profile, setProfile] = useState(false)
  const [loadingText, setLoadingText] = useState('Loading');

  let getUserDataFun = async () => {
    let token = localStorage.getItem('1001_ai_console_user_token')
    let result = await getUserData(token)
    dispatch(UserDataRed(result.data[0]))
  }
  let getSendEmailFun = async () => {
    let result = await getSendedEmail()
    setSentEmail(result.data)
  }

  useEffect(()=> {
    if(state.length === 0) {
      getUserDataFun()
    }
  }, [])

  useEffect(()=> {
      getSendEmailFun()
  }, [])

  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText.length < 13) {
          return prevText + '.';
        } else {
          return 'Loading';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  let logOut = () => {
    localStorage.clear()
    navigate('/signin')
  }

  let recieverFun = async (rec) => {
    if(rec?.length > 0) {
      let result = await getReceiver(rec)
      setReceiver(result?.data)
      setDropdownCon(true)
    } else
    setDropdownCon(false)
  }
  
  let submitFun = async () => {
    let composedEmail = {
      sender_email : state?.email,
      ...composeEmail
    }
    let result = await sendEmail(composedEmail);
    // console.log(result.data)
  }

  let sidebarChange = () => {
    const sidebarOn = localStorage.getItem('sidebar_on');
    sidebarOn === "true" ? localStorage.setItem('sidebar_on', false) : localStorage.setItem('sidebar_on', true);
    window.location.reload();
  }
  return (
    <>
      <div>
        {/* App preloader*/}
        {/* <div className="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900">
          <div className="app-preloader-inner relative inline-block h-48 w-48" />
        </div> */}
        {/* Page Wrapper */}
        <div id="root" className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900" x-cloak>
          {/* Sidebar */}
<div className="sidebar print:hidden">
  {/* Main Sidebar */}
  <MainSidebar />
  {/* Sidebar Panel */}
  <div className="sidebar-panel" style={{display : state2 === 1 && 'none', display : 'none'}}>
    <div className="flex h-full grow flex-col bg-white pl-[var(--main-sidebar-width)] dark:bg-navy-750">
      {/* Sidebar Panel Header */}
      <div className="flex h-18 w-full items-center justify-between pl-4 pr-1">
        <div className="flex items-center">
          <div className="avatar mr-3 hidden h-9 w-9 lg:flex">
            <div className="is-initial rounded-full bg-warning/10 text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-lg font-medium tracking-wider text-slate-800 line-clamp-1 dark:text-navy-100">
            Mail
          </p>
        </div>
        <button className="btn h-7 w-7 rounded-full p-0 text-primary hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:text-accent-light/80 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 xl:hidden" onClick={sidebarChange}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      {/* Sidebar Panel Body */}
      <div className="flex h-[calc(100%-4.5rem)] grow flex-col">
        <div className="is-scrollbar-hidden grow overflow-y-auto">
          <div className="mt-2 px-4">





      {/* Notification*/}
      <div x-effect="if($store.global.isSearchbarActive) isShowPopper = false" x-data="usePopper({placement:'bottom-end',offset:12})" className="flex">
                    <button x-ref="popperRef" className="btn relative w-full space-x-2 rounded-full border border-slate-200 py-2 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-500 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90" onClick={()=> setMessage(!message)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span> New Message</span>
            </button>
        <div className={`popper-root ${message && 'show'}`} x-ref="popperRoot" style={{position: 'fixed', inset: '0px 0px auto auto', margin: '0px', transform: 'translate(-98px, 58px)'}} data-popper-placement="bottom-end">
          <div x-data="{activeTab:'tabAll'}" className="popper-box mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg border border-slate-150 bg-white shadow-soft dark:border-navy-800 dark:bg-navy-700 dark:shadow-soft-dark sm:m-0 sm:w-80" style={{width : '35vw'}}>
            <div className="rounded-t-lg bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-navy-200">
              <div className="flex items-center justify-between px-4 pt-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-slate-700 dark:text-navy-100">
                    Compose Message
                  </h3>
                  {/* <div className="badge h-5 rounded-full bg-primary/10 px-1.5 text-primary dark:bg-accent-light/15 dark:text-accent-light">
                    26
                  </div> */}
                </div>
                <button className="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25" onClick={()=>setMessage(false)}>
<svg fill="#000000" className="h-4.5 w-4.5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 455 455" xmlSpace="preserve">
  <g>
    <g>
      <path d="M227.5,0C101.761,0,0,101.75,0,227.5C0,353.239,101.75,455,227.5,455C353.239,455,455,353.25,455,227.5
			C455.001,101.761,353.251,0,227.5,0z M310.759,268.333c11.715,11.716,11.715,30.711,0,42.427
			c-5.858,5.858-13.536,8.787-21.213,8.787s-15.355-2.929-21.213-8.787L227.5,269.927l-40.832,40.832
			c-5.858,5.858-13.536,8.787-21.213,8.787s-15.355-2.929-21.213-8.787c-11.715-11.716-11.715-30.711,0-42.427l40.832-40.832
			l-40.832-40.832c-11.715-11.716-11.715-30.711,0-42.427c11.716-11.716,30.711-11.716,42.427,0l40.832,40.832l40.832-40.832
			c11.716-11.716,30.711-11.716,42.427,0c11.715,11.716,11.715,30.711,0,42.427L269.927,227.5L310.759,268.333z" />
    </g>
  </g>
</svg>

                </button>
              </div>
              {/* <div className="is-scrollbar-hidden flex shrink-0 overflow-x-auto px-3">
                <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 border-primary dark:border-accent text-primary dark:text-accent-light">
                  <span>All</span>
                </button>
                <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100">
                  <span>Alerts</span>
                </button>
                <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100">
                  <span>Events</span>
                </button>
                <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100">
                  <span>Logs</span>
                </button>
              </div> */}
            </div>
            <div className="tab-content flex flex-col overflow-hidden">
              <div className="is-scrollbar-hidden space-y-4 overflow-y-auto px-4 py-4" style={{overflowY : 'auto', height : '420px'}}>
       <label className="block text-align-left">
  <span>Sender:</span>
  <input
        disabled
        class="form-input w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary disabled:pointer-events-none disabled:select-none disabled:border-none disabled:bg-zinc-100 dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent dark:disabled:bg-navy-600"
        placeholder={state?.email?.length > 0 ? state?.email : loadingText}
        type="text"
      />
</label>
<div className={`ts-wrapper mt-1.5 w-full single full has-items focus ${dropdownCon === true ? "input-active dropdown-active" : ""}`}>
<label className="block text-align-left">
  <span>Reciever:</span>
  <input className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent" placeholder="Email" type="email" name="reciever_email" onChange={(e)=> {
    recieverFun(e.target.value)
    setCurrentEmail(e.target.value)
  }
  } value={currentEmail} />
</label>
<div className="ts-dropdown single" style={{display: dropdownCon === true ? 'block' : 'none', visibility: 'visible'}}>
  <div role="listbox" tabIndex={-1} className="ts-dropdown-content" id="tomselect-5-ts-dropdown">
    {receiver?.map((receivedEmail) => (
          <div data-selectable data-value="Birthday" className="option" role="option" id="tomselect-5-opt-3" aria-selected="true" key={receivedEmail?.email} onClick={()=> 
            {
            setCurrentEmail(receivedEmail?.email)
            setComposeEmail({...composeEmail, receiver_email : receivedEmail?.email})
            setDropdownCon(false)
          }
          }>{receivedEmail?.email}</div>
    ))}
    </div></div>
</div>


<div className="ql-header-filled w-full">
  <div className="ql-toolbar ql-snow" style={{display : 'none'}}><span className="ql-formats"><button type="button" className="ql-bold"><svg viewBox="0 0 18 18"> <path className="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z" /> <path className="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z" /> </svg></button><button type="button" className="ql-italic"><svg viewBox="0 0 18 18"> <line className="ql-stroke" x1={7} x2={13} y1={4} y2={4} /> <line className="ql-stroke" x1={5} x2={11} y1={14} y2={14} /> <line className="ql-stroke" x1={8} x2={10} y1={14} y2={4} /> </svg></button><button type="button" className="ql-underline"><svg viewBox="0 0 18 18"> <path className="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3" /> <rect className="ql-fill" height={1} rx="0.5" ry="0.5" width={12} x={3} y={15} /> </svg></button><button type="button" className="ql-strike"><svg viewBox="0 0 18 18"> <line className="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5" /> <path className="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z" /> <path className="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z" /> </svg></button></span><span className="ql-formats"><button type="button" className="ql-blockquote"><svg viewBox="0 0 18 18"> <rect className="ql-fill ql-stroke" height={3} width={3} x={4} y={5} /> <rect className="ql-fill ql-stroke" height={3} width={3} x={11} y={5} /> <path className="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5" /> <path className="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5" /> </svg></button><button type="button" className="ql-code-block"><svg viewBox="0 0 18 18"> <polyline className="ql-even ql-stroke" points="5 7 3 9 5 11" /> <polyline className="ql-even ql-stroke" points="13 7 15 9 13 11" /> <line className="ql-stroke" x1={10} x2={8} y1={5} y2={13} /> </svg></button></span><span className="ql-formats"><span className="ql-header ql-picker"><span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-13"><svg viewBox="0 0 18 18"> <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11" /> <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7" /> </svg></span><span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-13"><span tabIndex={0} role="button" className="ql-picker-item" data-value={1} /><span tabIndex={0} role="button" className="ql-picker-item" data-value={2} /><span tabIndex={0} role="button" className="ql-picker-item" data-value={3} /><span tabIndex={0} role="button" className="ql-picker-item" data-value={4} /><span tabIndex={0} role="button" className="ql-picker-item" data-value={5} /><span tabIndex={0} role="button" className="ql-picker-item" data-value={6} /><span tabIndex={0} role="button" className="ql-picker-item ql-selected" /></span></span><select className="ql-header" style={{display: 'none'}}><option value={1} /><option value={2} /><option value={3} /><option value={4} /><option value={5} /><option value={6} /><option selected="selected" /></select></span><span className="ql-formats"><span className="ql-color ql-picker ql-color-picker"><span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-14"><svg viewBox="0 0 18 18"> <line className="ql-color-label ql-stroke ql-transparent" x1={3} x2={15} y1={15} y2={15} /> <polyline className="ql-stroke" points="5.5 11 9 3 12.5 11" /> <line className="ql-stroke" x1="11.63" x2="6.38" y1={9} y2={9} /> </svg></span><span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-14"><span tabIndex={0} role="button" className="ql-picker-item ql-selected ql-primary" /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#e60000" style={{backgroundColor: 'rgb(230, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ff9900" style={{backgroundColor: 'rgb(255, 153, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ffff00" style={{backgroundColor: 'rgb(255, 255, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#008a00" style={{backgroundColor: 'rgb(0, 138, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#0066cc" style={{backgroundColor: 'rgb(0, 102, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#9933ff" style={{backgroundColor: 'rgb(153, 51, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffffff" style={{backgroundColor: 'rgb(255, 255, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#facccc" style={{backgroundColor: 'rgb(250, 204, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffebcc" style={{backgroundColor: 'rgb(255, 235, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffffcc" style={{backgroundColor: 'rgb(255, 255, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce8cc" style={{backgroundColor: 'rgb(204, 232, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce0f5" style={{backgroundColor: 'rgb(204, 224, 245)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ebd6ff" style={{backgroundColor: 'rgb(235, 214, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#bbbbbb" style={{backgroundColor: 'rgb(187, 187, 187)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#f06666" style={{backgroundColor: 'rgb(240, 102, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffc266" style={{backgroundColor: 'rgb(255, 194, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffff66" style={{backgroundColor: 'rgb(255, 255, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#66b966" style={{backgroundColor: 'rgb(102, 185, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#66a3e0" style={{backgroundColor: 'rgb(102, 163, 224)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#c285ff" style={{backgroundColor: 'rgb(194, 133, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#888888" style={{backgroundColor: 'rgb(136, 136, 136)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#a10000" style={{backgroundColor: 'rgb(161, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#b26b00" style={{backgroundColor: 'rgb(178, 107, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#b2b200" style={{backgroundColor: 'rgb(178, 178, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#006100" style={{backgroundColor: 'rgb(0, 97, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#0047b2" style={{backgroundColor: 'rgb(0, 71, 178)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#6b24b2" style={{backgroundColor: 'rgb(107, 36, 178)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#444444" style={{backgroundColor: 'rgb(68, 68, 68)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#5c0000" style={{backgroundColor: 'rgb(92, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#663d00" style={{backgroundColor: 'rgb(102, 61, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#666600" style={{backgroundColor: 'rgb(102, 102, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#003700" style={{backgroundColor: 'rgb(0, 55, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#002966" style={{backgroundColor: 'rgb(0, 41, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#3d1466" style={{backgroundColor: 'rgb(61, 20, 102)'}} /></span></span><select className="ql-color" style={{display: 'none'}}><option selected="selected" /><option value="#e60000" /><option value="#ff9900" /><option value="#ffff00" /><option value="#008a00" /><option value="#0066cc" /><option value="#9933ff" /><option value="#ffffff" /><option value="#facccc" /><option value="#ffebcc" /><option value="#ffffcc" /><option value="#cce8cc" /><option value="#cce0f5" /><option value="#ebd6ff" /><option value="#bbbbbb" /><option value="#f06666" /><option value="#ffc266" /><option value="#ffff66" /><option value="#66b966" /><option value="#66a3e0" /><option value="#c285ff" /><option value="#888888" /><option value="#a10000" /><option value="#b26b00" /><option value="#b2b200" /><option value="#006100" /><option value="#0047b2" /><option value="#6b24b2" /><option value="#444444" /><option value="#5c0000" /><option value="#663d00" /><option value="#666600" /><option value="#003700" /><option value="#002966" /><option value="#3d1466" /></select><span className="ql-background ql-picker ql-color-picker"><span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-15"><svg viewBox="0 0 18 18"> <g className="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868" /> <rect height={1} width={1} x={4} y={4} /> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5" /> <rect height={1} width={1} x={2} y={6} /> <rect height={1} width={1} x={3} y={5} /> <rect height={1} width={1} x={4} y={7} /> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439" /> <rect height={1} width={1} x={2} y={12} /> <rect height={1} width={1} x={2} y={9} /> <rect height={1} width={1} x={2} y={15} /> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10" /> <rect height={1} width={1} x={3} y={8} /> <path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z" /> <path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z" /> <path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z" /> <rect height={1} width={1} x={12} y={2} /> <rect height={1} width={1} x={11} y={3} /> <path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z" /> <rect height={1} width={1} x={2} y={3} /> <rect height={1} width={1} x={6} y={2} /> <rect height={1} width={1} x={3} y={2} /> <rect height={1} width={1} x={5} y={3} /> <rect height={1} width={1} x={9} y={2} /> <rect height={1} width={1} x={15} y={14} /> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174" /> <rect height={1} width={1} x={13} y={7} /> <rect height={1} width={1} x={15} y={5} /> <rect height={1} width={1} x={14} y={6} /> <rect height={1} width={1} x={15} y={8} /> <rect height={1} width={1} x={14} y={9} /> <path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z" /> <rect height={1} width={1} x={14} y={3} /> <polygon points="12 6.868 12 6 11.62 6 12 6.868" /> <rect height={1} width={1} x={15} y={2} /> <rect height={1} width={1} x={12} y={5} /> <rect height={1} width={1} x={13} y={4} /> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9" /> <rect height={1} width={1} x={9} y={14} /> <rect height={1} width={1} x={8} y={15} /> <path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z" /> <rect height={1} width={1} x={5} y={15} /> <path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z" /> <rect height={1} width={1} x={11} y={15} /> <path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z" /> <rect height={1} width={1} x={14} y={15} /> <rect height={1} width={1} x={15} y={11} /> </g> <polyline className="ql-stroke" points="5.5 13 9 5 12.5 13" /> <line className="ql-stroke" x1="11.63" x2="6.38" y1={11} y2={11} /> </svg></span><span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-15"><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#000000" style={{backgroundColor: 'rgb(0, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#e60000" style={{backgroundColor: 'rgb(230, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ff9900" style={{backgroundColor: 'rgb(255, 153, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ffff00" style={{backgroundColor: 'rgb(255, 255, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#008a00" style={{backgroundColor: 'rgb(0, 138, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#0066cc" style={{backgroundColor: 'rgb(0, 102, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#9933ff" style={{backgroundColor: 'rgb(153, 51, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item ql-selected" /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#facccc" style={{backgroundColor: 'rgb(250, 204, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffebcc" style={{backgroundColor: 'rgb(255, 235, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffffcc" style={{backgroundColor: 'rgb(255, 255, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce8cc" style={{backgroundColor: 'rgb(204, 232, 204)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce0f5" style={{backgroundColor: 'rgb(204, 224, 245)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ebd6ff" style={{backgroundColor: 'rgb(235, 214, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#bbbbbb" style={{backgroundColor: 'rgb(187, 187, 187)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#f06666" style={{backgroundColor: 'rgb(240, 102, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffc266" style={{backgroundColor: 'rgb(255, 194, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffff66" style={{backgroundColor: 'rgb(255, 255, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#66b966" style={{backgroundColor: 'rgb(102, 185, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#66a3e0" style={{backgroundColor: 'rgb(102, 163, 224)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#c285ff" style={{backgroundColor: 'rgb(194, 133, 255)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#888888" style={{backgroundColor: 'rgb(136, 136, 136)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#a10000" style={{backgroundColor: 'rgb(161, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#b26b00" style={{backgroundColor: 'rgb(178, 107, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#b2b200" style={{backgroundColor: 'rgb(178, 178, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#006100" style={{backgroundColor: 'rgb(0, 97, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#0047b2" style={{backgroundColor: 'rgb(0, 71, 178)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#6b24b2" style={{backgroundColor: 'rgb(107, 36, 178)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#444444" style={{backgroundColor: 'rgb(68, 68, 68)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#5c0000" style={{backgroundColor: 'rgb(92, 0, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#663d00" style={{backgroundColor: 'rgb(102, 61, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#666600" style={{backgroundColor: 'rgb(102, 102, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#003700" style={{backgroundColor: 'rgb(0, 55, 0)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#002966" style={{backgroundColor: 'rgb(0, 41, 102)'}} /><span tabIndex={0} role="button" className="ql-picker-item" data-value="#3d1466" style={{backgroundColor: 'rgb(61, 20, 102)'}} /></span></span><select className="ql-background" style={{display: 'none'}}><option value="#000000" /><option value="#e60000" /><option value="#ff9900" /><option value="#ffff00" /><option value="#008a00" /><option value="#0066cc" /><option value="#9933ff" /><option selected="selected" /><option value="#facccc" /><option value="#ffebcc" /><option value="#ffffcc" /><option value="#cce8cc" /><option value="#cce0f5" /><option value="#ebd6ff" /><option value="#bbbbbb" /><option value="#f06666" /><option value="#ffc266" /><option value="#ffff66" /><option value="#66b966" /><option value="#66a3e0" /><option value="#c285ff" /><option value="#888888" /><option value="#a10000" /><option value="#b26b00" /><option value="#b2b200" /><option value="#006100" /><option value="#0047b2" /><option value="#6b24b2" /><option value="#444444" /><option value="#5c0000" /><option value="#663d00" /><option value="#666600" /><option value="#003700" /><option value="#002966" /><option value="#3d1466" /></select></span><span className="ql-formats"><button type="button" className="ql-clean"><svg className viewBox="0 0 18 18"> <line className="ql-stroke" x1={5} x2={13} y1={3} y2={3} /> <line className="ql-stroke" x1={6} x2="9.35" y1={12} y2={3} /> <line className="ql-stroke" x1={11} x2={15} y1={11} y2={15} /> <line className="ql-stroke" x1={15} x2={11} y1={11} y2={15} /> <rect className="ql-fill" height={1} rx="0.5" ry="0.5" width={7} x={2} y={14} /> </svg></button></span></div><div className="h-48 ql-container ql-snow" x-init="$el._x_quill = new Quill($el,{
              modules:{
                  toolbar: [
                      ['bold', 'italic', 'underline', 'strike'],
                      ['blockquote', 'code-block'],
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      [{ color: [] }, { background: [] }],
                      ['clean'],
                  ]
              },
              placeholder: 'Enter your content...',
              theme: 'snow',
          })"><div id='myQuillEditor' className="ql-editor ql-blank" data-gramm="false" contentEditable="true" suppressContentEditableWarning={true} data-placeholder="Enter your content...">
            <p><br /></p>
            </div>
            <div className="ql-clipboard" contentEditable="true" suppressContentEditableWarning={true} tabIndex={-1} /><div className="ql-tooltip ql-hidden"><a className="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank" /><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL" /><a className="ql-action" /><a className="ql-remove" /></div></div>
</div>

  <button className="btn mx-2 border border-secondary/30 bg-secondary/10 font-medium text-secondary hover:bg-secondary/20 focus:bg-secondary/20 active:bg-secondary/25 dark:border-accent-light/30 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25" onClick={()=>setMessage(false)}>
    Cancel
  </button>
  <button className="btn border border-primary/30 bg-primary/10 font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:border-accent-light/30 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25" onClick={submitFun}>
    Send
  </button>

              </div>
            </div>
          </div>
        </div>
      </div>

          </div>
          <ul className="mt-4 space-y-1.5 px-2 font-inter text-xs+ font-medium">
            <li onClick={()=> setCurrentTab(1)}>
              <a className={`group flex justify-between space-x-2 rounded-lg p-2 tracking-wide outline-none transition-all dark:bg-accent-light/10 dark:text-accent-light ${currentTab === 1 ?"bg-primary/10 text-primary" : "text-slate-800 hover:bg-slate-100 focus:bg-slate-100"}`} href="#">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                  </svg>
                  <span>Inbox</span>
                </div>
                <span className="text-primary dark:text-accent-light">2</span>
              </a>
            </li>
            <li onClick={()=> setCurrentTab(2)}>
              <a className={`group flex justify-between space-x-2 rounded-lg p-2 tracking-wide outline-none transition-all dark:bg-accent-light/10 dark:text-accent-light ${currentTab === 2 ?"bg-primary/10 text-primary" : "text-slate-800 hover:bg-slate-100 focus:bg-slate-100"}`} href="#">
                <div className="flex items-center space-x-2">
<svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24">
<path fill="currentColor" d="m8.625 3.37.353-.661-.353.661Zm10.49 5.602-.354.662.353-.662Zm-.005 6.082.352.662-.352-.662ZM8.626 20.632l-.352-.662.352.662Zm-4.461-4.08-.718-.216.718.216Zm-.007-9.107-.718.215.718-.215Zm4.713 5.323a.75.75 0 0 0 0-1.5v1.5Zm-.6-8.736 10.49 5.602.707-1.323-10.49-5.602-.707 1.323Zm10.487 10.36L8.274 19.97l.704 1.324 10.484-5.578-.704-1.324ZM4.883 16.768l1.364-4.534-1.437-.432-1.363 4.534 1.436.432Zm1.364-4.965-1.37-4.574-1.437.43 1.37 4.574 1.437-.43Zm-.719.965h3.343v-1.5H5.528v1.5Zm2.746 7.202c-.95.505-1.94.289-2.643-.353-.706-.646-1.091-1.708-.748-2.85l-1.436-.431c-.519 1.724.064 3.374 1.172 4.388 1.113 1.017 2.783 1.409 4.36.57l-.705-1.324ZM18.76 9.634c1.82.972 1.818 3.79-.003 4.758l.704 1.325c2.882-1.534 2.884-5.869.006-7.406l-.707 1.323ZM8.978 2.709c-1.575-.841-3.246-.453-4.36.564C3.507 4.285 2.922 5.935 3.44 7.66l1.437-.43c-.343-1.143.044-2.204.751-2.85.703-.64 1.694-.855 2.643-.348l.707-1.323Z"></path>
</svg>
                  <span>Sent</span>
                </div>
                <span className="text-primary dark:text-accent-light">2</span>
              </a>
            </li>
            <li>
              <a className="group flex justify-between space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-slate-800 dark:text-navy-100">Draft</span>
                </div>
              </a>
            </li>
            <li>
              <a className="group flex justify-between space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <span className="text-slate-800 dark:text-navy-100">Span</span>
                </div>
                <span className="text-primary dark:text-accent-light">4</span>
              </a>
            </li>
            <li>
              <a className="group flex justify-between space-x-2 rounded-lg p-2 tracking-wide text-error outline-none transition-all hover:bg-error/20 focus:bg-error/20" href="#">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Trash</span>
                </div>
              </a>
            </li>
          </ul>
          <div className="my-3 mx-4 h-px bg-slate-200 dark:bg-navy-500" />
          <div className="flex items-center justify-between px-4">
            <span className="text-xs font-medium uppercase">Labels </span>
            <div className="-mr-1.5 flex">
              <button className="btn h-6 w-6 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div x-data="usePopper({placement:'bottom-end',offset:4})" className="inline-flex">
                <button x-ref="popperRef" className="btn h-6 w-6 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <div x-ref="popperRoot" className="popper-root" style={{position: 'fixed', inset: 'auto 0px 0px auto', margin: 0, transform: 'translate(-10px, -45px)'}} data-popper-placement="top-end" data-popper-reference-hidden>
                  <div className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
                    <ul>
                      <li>
                        <a href="#" className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Action</a>
                      </li>
                      <li>
                        <a href="#" className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Another Action</a>
                      </li>
                      <li>
                        <a href="#" className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Something else</a>
                      </li>
                    </ul>
                    <div className="my-1 h-px bg-slate-150 dark:bg-navy-500" />
                    <ul>
                      <li>
                        <a href="#" className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Separated Link</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="mt-1 space-y-1.5 px-2 font-inter text-xs+ font-medium">
            <li>
              <a className="group flex space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-slate-800 dark:text-navy-100">Important</span>
              </a>
            </li>
            <li>
              <a className="group flex space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="text-slate-800 dark:text-navy-100">Saved</span>
              </a>
            </li>
            <li>
              <a className="group flex space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-slate-800 dark:text-navy-100">Archive</span>
              </a>
            </li>
            <li>
              <a className="group flex space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-secondary dark:text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-slate-800 dark:text-navy-100">Work</span>
              </a>
            </li>
            <li>
              <a className="group flex space-x-2 rounded-lg p-2 tracking-wide text-slate-800 outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:text-navy-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-slate-800 dark:text-navy-100">Personal</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col p-4">
          <div className="progress h-2 bg-slate-150 dark:bg-navy-500">
            <div className="w-7/12 rounded-full bg-info" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p>
              <span className="font-medium text-slate-600 dark:text-navy-100">500GB </span>
              of 1TB
            </p>
            <NavLink to="/auth/pricing" className="text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">Upgrade</NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Minimized Sidebar Panel */}
  <div className="sidebar-panel-min" style={{display : state2 === 1 && 'none'}}>
    <div className="flex h-full flex-col items-center bg-white dark:bg-navy-750">
      <div className="flex h-18 shrink-0 items-center justify-center">
        <div className="avatar flex h-10 w-10 rounded-full bg-primary/10 text-primary dark:bg-accent-light/10 dark:text-accent-light">
          <div className="is-initial">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100%-4.5rem)] grow flex-col">
        <div className="is-scrollbar-hidden flex grow flex-col overflow-y-auto">
          <ul className="mt-4 space-y-1">
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25" onClick={()=> setMessage(!message)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 bg-primary/10 p-0 font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m8.625 3.37.353-.661-.353.661Zm10.49 5.602-.354.662.353-.662Zm-.005 6.082.352.662-.352-.662ZM8.626 20.632l-.352-.662.352.662Zm-4.461-4.08-.718-.216.718.216Zm-.007-9.107-.718.215.718-.215Zm4.713 5.323a.75.75 0 0 0 0-1.5v1.5Zm-.6-8.736 10.49 5.602.707-1.323-10.49-5.602-.707 1.323Zm10.487 10.36L8.274 19.97l.704 1.324 10.484-5.578-.704-1.324ZM4.883 16.768l1.364-4.534-1.437-.432-1.363 4.534 1.436.432Zm1.364-4.965-1.37-4.574-1.437.43 1.37 4.574 1.437-.43Zm-.719.965h3.343v-1.5H5.528v1.5Zm2.746 7.202c-.95.505-1.94.289-2.643-.353-.706-.646-1.091-1.708-.748-2.85l-1.436-.431c-.519 1.724.064 3.374 1.172 4.388 1.113 1.017 2.783 1.409 4.36.57l-.705-1.324ZM18.76 9.634c1.82.972 1.818 3.79-.003 4.758l.704 1.325c2.882-1.534 2.884-5.869.006-7.406l-.707 1.323ZM8.978 2.709c-1.575-.841-3.246-.453-4.36.564C3.507 4.285 2.922 5.935 3.44 7.66l1.437-.43c-.343-1.143.044-2.204.751-2.85.703-.64 1.694-.855 2.643-.348l.707-1.323Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </a>
            </li>
          </ul>
          <div className="my-4 h-px bg-slate-200 dark:bg-navy-500" />
          <ul className="space-y-1">
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="btn h-10 w-10 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="py-3">
          <div x-data="usePopper({placement:'right-start',offset:4})" className="inline-flex">
            <button x-ref="popperRef" className="btn h-10 w-10 rounded-full border border-slate-200 p-0 font-medium hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-500 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

          {/* Right Sidebar */}
          <div x-show="$store.global.isRightSidebarExpanded" style={{display : 'none'}} onClick={()=> setProfile(false)}>
            <div className="fixed inset-0 z-[150] bg-slate-900/60 transition-opacity duration-200" />
            <div className="fixed right-0 top-0 z-[151] h-full w-full sm:w-80">
              <div x-data="{activeTab:'tabHome'}" className="relative flex h-full w-full transform-gpu flex-col bg-white transition-transform duration-200 dark:bg-navy-750">
                <div className="flex items-center justify-between py-2 px-4">
                  <p x-show="activeTab === 'tabHome'" className="flex shrink-0 items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">25 May, 2022</span>
                  </p>
                  <p x-show="activeTab === 'tabProjects'" className="flex shrink-0 items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span className="text-xs">Projects</span>
                  </p>
                  <p x-show="activeTab === 'tabActivity'" className="flex shrink-0 items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs">Activity</span>
                  </p>
                  <button className="btn -mr-1 h-6 w-6 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="is-scrollbar-hidden overflow-y-auto overscroll-contain pt-1">
                  <label className="relative flex px-3">
                    <input className="form-input peer h-8 w-full rounded-lg bg-slate-150 px-3 py-2 pl-9 text-xs+ ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900" placeholder="Search here..." type="text" />
                    <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z" />
                      </svg>
                    </span>
                  </label>
                  <div className="mt-3">
                    <h2 className="px-3 text-xs+ font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                      Banking cards
                    </h2>
                    <div className="swiper mt-3 px-3" x-init="$nextTick(()=>new Swiper($el,{  slidesPerView: 'auto', spaceBetween: 16}))">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide relative flex h-28 w-48 flex-col overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 p-3">
                          <div className="grow">
                            <img className="h-3" src="/assets/images/payments/cc-visa-white.svg" alt="image" />
                          </div>
                          <div className="text-white">
                            <p className="text-lg font-semibold tracking-wide">
                              $2,139.22
                            </p>
                            <p className="mt-1 text-xs font-medium">
                              **** **** **** 8945
                            </p>
                          </div>
                          <div className="mask is-reuleaux-triangle absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20" />
                        </div>
                        <div className="swiper-slide relative flex h-28 w-48 flex-col overflow-hidden rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 p-3">
                          <div className="grow">
                            <img className="h-3" src="/assets/images/payments/cc-visa-white.svg" alt="image" />
                          </div>
                          <div className="text-white">
                            <p className="text-lg font-semibold tracking-wide">
                              $2,139.22
                            </p>
                            <p className="mt-1 text-xs font-medium">
                              **** **** **** 8945
                            </p>
                          </div>
                          <div className="mask is-diamond absolute bottom-0 right-0 -m-3 h-16 w-16 bg-white/20" />
                        </div>
                        <div className="swiper-slide relative flex h-28 w-48 flex-col overflow-hidden rounded-xl bg-gradient-to-br from-info to-info-focus p-3">
                          <div className="grow">
                            <img className="h-3" src="/assets/images/payments/cc-visa-white.svg" alt="image" />
                          </div>
                          <div className="text-white">
                            <p className="text-lg font-semibold tracking-wide">
                              $2,139.22
                            </p>
                            <p className="mt-1 text-xs font-medium">
                              **** **** **** 8945
                            </p>
                          </div>
                          <div className="mask is-hexagon-2 absolute top-0 right-0 -m-3 h-16 w-16 bg-white/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 px-3">
                    <h2 className="text-xs+ font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                      Pinned Apps
                    </h2>
                    <div className="mt-3 flex space-x-3">
                      <a href="apps-kanban.html" className="w-12 text-center">
                        <div className="avatar h-10 w-10">
                          <div className="is-initial mask is-squircle bg-success text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                          </div>
                        </div>
                        <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                          Kanban
                        </p>
                      </a>
                      <a href="dashboards-crm-analytics.html" className="w-12 text-center">
                        <div className="avatar h-10 w-10">
                          <div className="is-initial mask is-squircle bg-warning text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                        <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                          Analytics
                        </p>
                      </a>
                      <a href="apps-chat.html" className="w-12 text-center">
                        <div className="avatar h-10 w-10">
                          <div className="is-initial mask is-squircle bg-info text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                        </div>
                        <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                          Chat
                        </p>
                      </a>
                      <a href="apps-filemanager.html" className="w-12 text-center">
                        <div className="avatar h-10 w-10">
                          <div className="is-initial mask is-squircle bg-error text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                          </div>
                        </div>
                        <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                          Files
                        </p>
                      </a>
                      <a href="dashboards-banking-1.html" className="w-12 text-center">
                        <div className="avatar h-10 w-10">
                          <div className="is-initial mask is-squircle bg-secondary text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                          </div>
                        </div>
                        <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                          Banking
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-3 px-3">
                      <div className="rounded-lg bg-slate-150 px-2.5 py-2 dark:bg-navy-600">
                        <div className="flex items-center justify-between space-x-1">
                          <p>
                            <span className="text-lg font-medium text-slate-700 dark:text-navy-100">11.3</span>
                            <span className="text-xs">hr</span>
                          </p>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-secondary dark:text-secondary-light" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="mt-0.5 text-tiny+ uppercase">Working Hours</p>
                        <div className="progress mt-3 h-1.5 bg-secondary/15 dark:bg-secondary-light/25">
                          <div className="is-active relative w-8/12 overflow-hidden rounded-full bg-secondary dark:bg-secondary-light" />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400 dark:text-navy-300">
                          <button className="btn -ml-1 h-6 w-6 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <span> 71%</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-150 px-2.5 py-2 dark:bg-navy-600">
                        <div className="flex items-center justify-between space-x-1">
                          <p>
                            <span className="text-lg font-medium text-slate-700 dark:text-navy-100">13</span>
                            <span className="text-xs">/22</span>
                          </p>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-success" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="mt-0.5 text-tiny+ uppercase">Completed tasks</p>
                        <div className="progress mt-3 h-1.5 bg-success/15 dark:bg-success/25">
                          <div className="relative w-6/12 overflow-hidden rounded-full bg-success" />
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400 dark:text-navy-300">
                          <button className="btn -ml-1 h-6 w-6 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <span> 49%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="px-3 text-xs+ font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                      Stock Market
                    </h2>
                    <div className="mt-3 grid grid-cols-2 gap-3 px-3">
                      <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-navy-600">
                        <div className="flex items-center space-x-2">
                          <img className="h-10 w-10" src="/assets/images/logos/bitcoin.svg" alt="image" />
                          <div>
                            <h2 className="font-medium tracking-wide text-slate-700 dark:text-navy-100">
                              BTC
                            </h2>
                            <p className="text-xs">Bitcoin</p>
                          </div>
                        </div>
                        <div className="ax-transparent-gridline">
                          <div x-init="$nextTick(() => { $el._x_chart = new ApexCharts($el,pages.charts.stockMarket1); $el._x_chart.render() });" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="font-medium tracking-wide text-slate-700 dark:text-navy-100">
                            60.33$
                          </p>
                          <p className="text-xs font-medium tracking-wide text-success">
                            +3.3%
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-100 p-2.5 dark:bg-navy-600">
                        <div className="flex items-center space-x-2">
                          <img className="h-10 w-10" src="/assets/images/logos/solana.svg" alt="image" />
                          <div>
                            <h2 className="font-medium tracking-wide text-slate-700 dark:text-navy-100">
                              SOL
                            </h2>
                            <p className="text-xs">Solana</p>
                          </div>
                        </div>
                        <div className="ax-transparent-gridline">
                          <div x-init="$nextTick(() => { $el._x_chart = new ApexCharts($el,pages.charts.stockMarket2); $el._x_chart.render() });" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="font-medium tracking-wide text-slate-700 dark:text-navy-100">
                            20.56$
                          </p>
                          <p className="text-xs font-medium tracking-wide text-success">
                            +4.11%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="px-3 text-xs+ font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                      Latest News
                    </h2>
                    <div className="mt-3 space-y-3 px-2">
                      <div className="flex justify-between space-x-2 rounded-lg bg-slate-100 p-2.5 dark:bg-navy-700">
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="line-clamp-2">
                            <a href="#" className="font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light">What is Tailwind CSS?</a>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="avatar h-7 w-7">
                                <img className="rounded-full" src="/assets/images/avatar/avatar-20.jpg" alt="avatar" />
                              </div>
                              <div>
                                <p className="text-xs font-medium line-clamp-1">
                                  John D.
                                </p>
                                <p className="text-tiny+ text-slate-400 line-clamp-1 dark:text-navy-300">
                                  2 min read
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </button>
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <img src="/assets/images/object/object-18.jpg" className="h-20 w-20 rounded-lg object-cover object-center" alt="image" />
                      </div>
                      <div className="flex justify-between space-x-2 rounded-lg bg-slate-100 p-2.5 dark:bg-navy-700">
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="line-clamp-2">
                            <a href="#" className="font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light">Tailwind CSS Card Example</a>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="avatar h-7 w-7">
                                <img className="rounded-full" src="/assets/images/avatar/avatar-19.jpg" alt="avatar" />
                              </div>
                              <div>
                                <p className="text-xs font-medium line-clamp-1">
                                  Travis F.
                                </p>
                                <p className="text-tiny+ text-slate-400 line-clamp-1 dark:text-navy-300">
                                  5 min read
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </button>
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <img src="/assets/images/object/object-2.jpg" className="h-20 w-20 rounded-lg object-cover object-center" alt="image" />
                      </div>
                      <div className="flex justify-between space-x-2 rounded-lg bg-slate-100 p-2.5 dark:bg-navy-700">
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="line-clamp-2">
                            <a href="#" className="font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light">10 Tips for Making a Good Camera Even Better</a>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="avatar h-7 w-7">
                                <img className="rounded-full" src="/assets/images/avatar/avatar-18.jpg" alt="avatar" />
                              </div>
                              <div>
                                <p className="text-xs font-medium line-clamp-1">
                                  Alfredo E .
                                </p>
                                <p className="text-tiny+ text-slate-400 line-clamp-1 dark:text-navy-300">
                                  4 min read
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </button>
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <img src="/assets/images/object/object-1.jpg" className="h-20 w-20 rounded-lg object-cover object-center" alt="image" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-3">
                    <h2 className="text-xs+ font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                      Settings
                    </h2>
                    <div className="mt-2 flex flex-col space-y-2">
                      <label className="inline-flex items-center space-x-2">
                        <input x-model="$store.global.isDarkModeEnabled" className="form-switch h-5 w-10 rounded-lg bg-slate-300 before:rounded-md before:bg-slate-50 checked:bg-slate-500 checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-navy-400 dark:checked:before:bg-white" type="checkbox" />
                        <span>Dark Mode</span>
                      </label>
                      <label className="inline-flex items-center space-x-2">
                        <input x-model="$store.global.isMonochromeModeEnabled" className="form-switch h-5 w-10 rounded-lg bg-slate-300 before:rounded-md before:bg-slate-50 checked:bg-slate-500 checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-navy-400 dark:checked:before:bg-white" type="checkbox" />
                        <span>Monochrome Mode</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-3 px-3">
                    <div className="rounded-lg bg-slate-100 p-3 dark:bg-navy-600">
                      <div className="flex items-center justify-between">
                        <p>
                          <span className="font-medium text-slate-600 dark:text-navy-100">500GB</span>
                          of 1TB
                        </p>
                        <NavLink to="/auth/pricing" className="text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">Upgrade</NavLink>
                      </div>
                      <div className="progress mt-2 h-2 bg-slate-150 dark:bg-navy-500">
                        <div className="w-7/12 rounded-full bg-info" />
                      </div>
                    </div>
                  </div>
                  <div className="h-18" />
                </div>
                <div className="is-scrollbar-hidden overflow-y-auto overscroll-contain px-3 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-100 p-3 dark:bg-navy-600">
                      <div className="flex justify-between space-x-1">
                        <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                          14
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" className="h-5 w-5 text-primary dark:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs+">Pending</p>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-3 dark:bg-navy-600">
                      <div className="flex justify-between">
                        <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                          36
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <p className="mt-1 text-xs+">Completed</p>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-3 dark:bg-navy-600">
                      <div className="flex justify-between">
                        <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                          143
                        </p>
                        <i className="fa fa-spinner text-base text-warning" />
                      </div>
                      <p className="mt-1 text-xs+">In Progress</p>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-3 dark:bg-navy-600">
                      <div className="flex justify-between">
                        <p className="text-xl font-semibold text-slate-700 dark:text-navy-100">
                          279
                        </p>
                        <i className="fa-solid fa-list-check text-base text-info" />
                      </div>
                      <p className="mt-1 text-xs+">Total</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-150 p-3 dark:border-navy-600">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-lg object-cover object-center" src="/assets/images/illustrations/lms-ui.svg" alt="image" />
                      <div>
                        <p className="font-medium leading-snug text-slate-700 dark:text-navy-100">
                          LMS App Design
                        </p>
                        <p className="text-xs text-slate-400 dark:text-navy-300">
                          Updated at 7 Sep
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="progress h-1.5 bg-slate-150 dark:bg-navy-500">
                        <div className="w-4/12 rounded-full bg-primary dark:bg-accent" />
                      </div>
                      <p className="mt-2 text-right text-xs+ font-medium text-primary dark:text-accent-light">
                        25%
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between space-x-2">
                      <div className="flex -space-x-3">
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-16.jpg" alt="avatar" />
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <div className="is-initial rounded-full bg-info text-xs+ uppercase text-white ring ring-white dark:ring-navy-700">
                            jd
                          </div>
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-20.jpg" alt="avatar" />
                        </div>
                      </div>
                      <button className="btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-150 p-3 dark:border-navy-600">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-lg object-cover object-center" src="/assets/images/illustrations/store-ui.svg" alt="image" />
                      <div>
                        <p className="font-medium leading-snug text-slate-700 dark:text-navy-100">
                          Store Dashboard
                        </p>
                        <p className="text-xs text-slate-400 dark:text-navy-300">
                          Updated at 11 Sep
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="progress h-1.5 bg-slate-150 dark:bg-navy-500">
                        <div className="w-6/12 rounded-full bg-primary dark:bg-accent" />
                      </div>
                      <p className="mt-2 text-right text-xs+ font-medium text-primary dark:text-accent-light">
                        49%
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between space-x-2">
                      <div className="flex -space-x-3">
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-17.jpg" alt="avatar" />
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <div className="is-initial rounded-full bg-warning text-xs+ uppercase text-white ring ring-white dark:ring-navy-700">
                            dv
                          </div>
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-19.jpg" alt="avatar" />
                        </div>
                      </div>
                      <button className="btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-150 p-3 dark:border-navy-600">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-lg object-cover object-center" src="/assets/images/illustrations/chat-ui.svg" alt="image" />
                      <div>
                        <p className="font-medium leading-snug text-slate-700 dark:text-navy-100">
                          Chat Mobile App
                        </p>
                        <p className="text-xs text-slate-400 dark:text-navy-300">
                          Updated at 19 Sep
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="progress h-1.5 bg-slate-150 dark:bg-navy-500">
                        <div className="w-2/12 rounded-full bg-primary dark:bg-accent" />
                      </div>
                      <p className="mt-2 text-right text-xs+ font-medium text-primary dark:text-accent-light">
                        13%
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between space-x-2">
                      <div className="flex -space-x-3">
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-5.jpg" alt="avatar" />
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <div className="is-initial rounded-full bg-error text-xs+ uppercase text-white ring ring-white dark:ring-navy-700">
                            gt
                          </div>
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-11.jpg" alt="avatar" />
                        </div>
                      </div>
                      <button className="btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-150 p-3 dark:border-navy-600">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-lg object-cover object-center" src="/assets/images/illustrations/nft.svg" alt="image" />
                      <div>
                        <p className="font-medium leading-snug text-slate-700 dark:text-navy-100">
                          NFT Marketplace App
                        </p>
                        <p className="text-xs text-slate-400 dark:text-navy-300">
                          Updated at 5 Sep
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="progress h-1.5 bg-slate-150 dark:bg-navy-500">
                        <div className="w-9/12 rounded-full bg-primary dark:bg-accent" />
                      </div>
                      <p className="mt-2 text-right text-xs+ font-medium text-primary dark:text-accent-light">
                        78%
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between space-x-2">
                      <div className="flex -space-x-3">
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-8.jpg" alt="avatar" />
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <div className="is-initial rounded-full bg-success text-xs+ uppercase text-white ring ring-white dark:ring-navy-700">
                            jd
                          </div>
                        </div>
                        <div className="avatar h-7 w-7 hover:z-10">
                          <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-12.jpg" alt="avatar" />
                        </div>
                      </div>
                      <button className="btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="h-18" />
                </div>
                <div className="is-scrollbar-hidden overflow-y-auto overscroll-contain pt-1">
                  <div className="mx-3 flex flex-col items-center rounded-lg bg-slate-100 py-3 px-8 dark:bg-navy-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary dark:text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-2 text-xs">Today</p>
                    <p className="text-lg font-medium text-slate-700 dark:text-navy-100">
                      6hr 22m
                    </p>
                    <div className="progress mt-3 h-2 bg-secondary/15 dark:bg-secondary-light/25">
                      <div className="is-active relative w-8/12 overflow-hidden rounded-full bg-secondary dark:bg-secondary-light" />
                    </div>
                    <button className="btn mt-5 space-x-2 rounded-full border border-slate-300 px-3 text-xs+ font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                      </svg>
                      <span> Download Report</span>
                    </button>
                  </div>
                  <ol className="timeline line-space mt-5 px-4 [--size:1.5rem]">
                    <li className="timeline-item">
                      <div className="timeline-item-point rounded-full border border-current bg-white text-secondary dark:bg-navy-700 dark:text-secondary-light">
                        <i className="fa fa-user-edit text-tiny" />
                      </div>
                      <div className="timeline-item-content flex-1 pl-4">
                        <div className="flex flex-col justify-between pb-2 sm:flex-row sm:pb-0">
                          <p className="pb-2 font-medium leading-none text-slate-600 dark:text-navy-100 sm:pb-0">
                            User Photo Changed
                          </p>
                          <span className="text-xs text-slate-400 dark:text-navy-300">12 minute ago</span>
                        </div>
                        <p className="py-1">John Doe changed his avatar photo</p>
                        <div className="avatar mt-2 h-20 w-20">
                          <img className="mask is-squircle" src="/assets/images/avatar/avatar-19.jpg" alt="avatar" />
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="timeline-item-point rounded-full border border-current bg-white text-primary dark:bg-navy-700 dark:text-accent">
                        <i className="fa-solid fa-image text-tiny" />
                      </div>
                      <div className="timeline-item-content flex-1 pl-4">
                        <div className="flex flex-col justify-between pb-2 sm:flex-row sm:pb-0">
                          <p className="pb-2 font-medium leading-none text-slate-600 dark:text-navy-100 sm:pb-0">
                            Images Added
                          </p>
                          <span className="text-xs text-slate-400 dark:text-navy-300">1 hour ago</span>
                        </div>
                        <p className="py-1">Mores Clarke added new image gallery</p>
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <img className="rounded-lg" src="/assets/images/object/object-1.jpg" alt="image" />
                          <img className="rounded-lg" src="/assets/images/object/object-2.jpg" alt="image" />
                          <img className="rounded-lg" src="/assets/images/object/object-3.jpg" alt="image" />
                          <img className="rounded-lg" src="/assets/images/object/object-4.jpg" alt="image" />
                          <img className="rounded-lg" src="/assets/images/object/object-5.jpg" alt="image" />
                          <img className="rounded-lg" src="/assets/images/object/object-6.jpg" alt="image" />
                        </div>
                        <div className="mt-4">
                          <span className="font-medium text-slate-600 dark:text-navy-100">
                            Category:
                          </span>
                          <a href="#" className="text-xs text-primary hover:text-primary-focus dark:text-accent-light dark:hover:text-accent">
                            #Tag
                          </a>
                          <a href="#" className="text-xs text-primary hover:text-primary-focus dark:text-accent-light dark:hover:text-accent">
                            #Category
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="timeline-item-point rounded-full border border-current bg-white text-success dark:bg-navy-700">
                        <i className="fa fa-leaf text-tiny" />
                      </div>
                      <div className="timeline-item-content flex-1 pl-4">
                        <div className="flex flex-col justify-between pb-2 sm:flex-row sm:pb-0">
                          <p className="pb-2 font-medium leading-none text-slate-600 dark:text-navy-100 sm:pb-0">
                            Design Completed
                          </p>
                          <span className="text-xs text-slate-400 dark:text-navy-300">3 hours ago</span>
                        </div>
                        <p className="py-1">
                          Robert Nolan completed the design of the CRM application
                        </p>
                        <a href="#" className="inline-flex items-center space-x-1 pt-2 text-slate-600 transition-colors hover:text-primary dark:text-navy-100 dark:hover:text-accent">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>File_final.fig</span>
                        </a>
                        <div className="pt-2">
                          <a href="#" className="tag rounded-full border border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20 focus:bg-secondary/20 active:bg-secondary/25 dark:border-secondary-light/30 dark:bg-secondary-light/10 dark:text-secondary-light dark:hover:bg-secondary-light/20 dark:focus:bg-secondary-light/20 dark:active:bg-secondary-light/25">
                            UI/UX
                          </a>
                          <a href="#" className="tag rounded-full border border-info/30 bg-info/10 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25">
                            CRM
                          </a>
                          <a href="#" className="tag rounded-full border border-success/30 bg-success/10 text-success hover:bg-success/20 focus:bg-success/20 active:bg-success/25">
                            Dashboard
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="timeline-item-point rounded-full border border-current bg-white text-warning dark:bg-navy-700">
                        <i className="fa fa-project-diagram text-tiny" />
                      </div>
                      <div className="timeline-item-content flex-1 pl-4">
                        <div className="flex flex-col justify-between pb-2 sm:flex-row sm:pb-0">
                          <p className="pb-2 font-medium leading-none text-slate-600 dark:text-navy-100 sm:pb-0">
                            ER Diagram
                          </p>
                          <span className="text-xs text-slate-400 dark:text-navy-300">a day ago</span>
                        </div>
                        <p className="py-1">Team completed the ER diagram app</p>
                        <div>
                          <p className="text-xs text-slate-400 dark:text-navy-300">
                            Members:
                          </p>
                          <div className="mt-2 flex justify-between">
                            <div className="flex flex-wrap -space-x-2">
                              <div className="avatar h-7 w-7 hover:z-10">
                                <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-16.jpg" alt="avatar" />
                              </div>
                              <div className="avatar h-7 w-7 hover:z-10">
                                <div className="is-initial rounded-full bg-info text-xs+ uppercase text-white ring ring-white dark:ring-navy-700">
                                  jd
                                </div>
                              </div>
                              <div className="avatar h-7 w-7 hover:z-10">
                                <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-20.jpg" alt="avatar" />
                              </div>
                              <div className="avatar h-7 w-7 hover:z-10">
                                <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-8.jpg" alt="avatar" />
                              </div>
                              <div className="avatar h-7 w-7 hover:z-10">
                                <img className="rounded-full ring ring-white dark:ring-navy-700" src="/assets/images/avatar/avatar-5.jpg" alt="avatar" />
                              </div>
                            </div>
                            <button className="btn h-7 w-7 rounded-full bg-slate-150 p-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item">
                      <div className="timeline-item-point rounded-full border border-current bg-white text-error dark:bg-navy-700">
                        <i className="fa fa-history text-tiny" />
                      </div>
                      <div className="timeline-item-content flex-1 pl-4">
                        <div className="flex flex-col justify-between pb-2 sm:flex-row sm:pb-0">
                          <p className="pb-2 font-medium leading-none text-slate-600 dark:text-navy-100 sm:pb-0">
                            Weekly Report
                          </p>
                          <span className="text-xs text-slate-400 dark:text-navy-300">a day ago</span>
                        </div>
                        <p className="py-1">The weekly report was uploaded</p>
                      </div>
                    </li>
                  </ol>
                  <div className="h-18" />
                </div>
                <div className="pointer-events-none absolute bottom-4 flex w-full justify-center">
                  <div className="pointer-events-auto mx-auto flex space-x-1 rounded-full border border-slate-150 bg-white px-4 py-0.5 shadow-lg dark:border-navy-700 dark:bg-navy-900">
                    <button className="btn h-9 rounded-full py-0 px-4 hover:bg-slate-300/20 hover:text-primary focus:bg-slate-300/20 focus:text-primary active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:hover:text-accent dark:focus:bg-navy-300/20 dark:focus:text-accent dark:active:bg-navy-300/25">
                      <svg x-show="activeTab === 'tabHome'" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <svg x-show="activeTab !== 'tabHome'" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </button>
                    <button  className="btn h-9 rounded-full py-0 px-4 hover:bg-slate-300/20 hover:text-primary focus:bg-slate-300/20 focus:text-primary active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:hover:text-accent dark:focus:bg-navy-300/20 dark:focus:text-accent dark:active:bg-navy-300/25">
                      <svg x-show="activeTab === 'tabProjects'" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <svg x-show="activeTab !== 'tabProjects'" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </button>
                    <button className="btn h-9 rounded-full py-0 px-4 hover:bg-slate-300/20 hover:text-primary focus:bg-slate-300/20 focus:text-primary active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:hover:text-accent dark:focus:bg-navy-300/20 dark:focus:text-accent dark:active:bg-navy-300/25">
                      <svg x-show="activeTab ===  'tabActivity'" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <svg x-show="activeTab !==  'tabActivity'" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* App Header Wrapper*/}
<Header />
          {/* Mobile Searchbar */}
          <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-navy-700 sm:hidden">
            <div className="flex items-center space-x-2 bg-slate-100 px-3 pt-2 dark:bg-navy-800">
              <button className="btn -ml-1.5 h-7 w-7 shrink-0 rounded-full p-0 text-slate-600 hover:bg-slate-300/20 active:bg-slate-300/25 dark:text-navy-100 dark:hover:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <input x-effect="$store.global.isSearchbarActive && $nextTick(() => $el.focus() );" className="form-input h-8 w-full bg-transparent placeholder-slate-400 dark:placeholder-navy-300" type="text" placeholder="Search here..." />
            </div>
            <div x-data="{activeTab:'tabAll'}" className="is-scrollbar-hidden flex shrink-0 overflow-x-auto bg-slate-100 px-2 text-slate-600 dark:bg-navy-800 dark:text-navy-200">
              <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                All
              </button>
              <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                Files
              </button>
              <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                Chats
              </button>
              <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                Emails
              </button>
              <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                Projects
              </button>
              <button  className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                Tasks
              </button>
            </div>
            <div className="is-scrollbar-hidden overflow-y-auto overscroll-contain pb-2">
              <div className="is-scrollbar-hidden mt-3 flex space-x-4 overflow-x-auto px-3">
                <a href="apps-kanban.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-success text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Kanban
                  </p>
                </a>
                <a href="dashboards-crm-analytics.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-secondary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Analytics
                  </p>
                </a>
                <a href="apps-chat.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-info text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Chat
                  </p>
                </a>
                <a href="apps-filemanager.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-error text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Files
                  </p>
                </a>
                <a href="dashboards-crypto-1.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-secondary text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Crypto
                  </p>
                </a>
                <a href="dashboards-banking-1.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-primary text-white dark:bg-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Banking
                  </p>
                </a>
                <a href="apps-todo.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-info text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M12.5293 18L20.9999 8.40002" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 13.2L7.23529 18L17.8235 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Todo
                  </p>
                </a>
                <a href="dashboards-orders.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-warning text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-700 dark:text-navy-100">
                    Orders
                  </p>
                </a>
              </div>
              <div className="mt-3 flex items-center justify-between bg-slate-100 py-1.5 px-3 dark:bg-navy-800">
                <p className="text-xs uppercase">Recent</p>
                <a href="#" className="text-tiny+ font-medium uppercase text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
                  View All
                </a>
              </div>
              <div className="mt-1 font-inter font-medium">
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="apps-chat.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat App</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="apps-filemanager.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span>File Manager App</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="apps-mail.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email App</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="apps-kanban.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <span>Kanban Board</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="apps-todo.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 13.2L7.23529 18L17.8235 6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5293 18L20.9999 8.40002" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Todo App</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="dashboards-crypto-2.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9a2 2 0 10-4 0v5a2 2 0 01-2 2h6m-6-4h4m8 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Crypto Dashboard</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="dashboards-banking-2.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span>Banking Dashboard</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="dashboards-crm-analytics.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Analytics Dashboard</span>
                </a>
                <a className="group flex items-center space-x-2 px-2.5 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100" href="dashboards-influencer.html">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 transition-colors group-hover:text-slate-500 group-focus:text-slate-500 dark:text-navy-300 dark:group-hover:text-navy-200 dark:group-focus:text-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Influencer Dashboard</span>
                </a>
              </div>
            </div>
          </div>
          {/* Main Content Wrapper */}
          <main className="main-content mail-app w-full px-[var(--margin-x)] pb-6" onClick={()=> setProfile(false)}>
            <div className="flex flex-col-reverse py-5 sm:flex-row sm:justify-between">
              <div className="mt-2 flex items-center justify-between space-x-1">
              </div>
            </div>
            <div className="card" style={{display : currentTab === 1 ? '' : 'none'}}>
              <SingleEmail />

            </div>
            <div className="mt-4 flex flex-col space-y-1 px-5 text-xs sm:flex-row sm:justify-between sm:space-y-0">
              <a href="#" className="hover:text-slate-700 hover:underline dark:hover:text-navy-100">Term &amp; Privacy</a>
              <p>Last activity: 3 minute ago</p>
            </div>
          </main>
          <div className="fixed right-3 bottom-3 rounded-full bg-white dark:bg-navy-700" onClick={()=> setProfile(false)}>
            <button className="btn h-14 w-14 rounded-full bg-warning p-0 font-medium text-white hover:bg-warning-focus focus:bg-warning-focus active:bg-warning-focus/90 sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
<div>

</div>


 
    </>
  )
}

export default Email


{/* <div
className="h-48"
x-init="$el._x_quill = new Quill($el,{
  modules : {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { header: 1 },
        { background: [] },
      ],
    ],
  },
  placeholder: 'Enter your content...',
  theme: 'snow',
})"
></div> */}
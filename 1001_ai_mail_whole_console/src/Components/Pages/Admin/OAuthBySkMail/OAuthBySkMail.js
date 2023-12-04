/* eslint-disable */
import React,{useEffect, useState}  from 'react'
import ErrorAlert from '../../../Shared/Alerts/ErrorAlert'
import {userDataByToken, getUserDataByTaken} from '../../../../Services/userSkService'
const OAuthBySkMail = ({clientId, clientSecret}) => {
 // Custom hook to listen for localStorage changes
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
// Then in your component
let [message, setMessage] = useState(false)
let [showAlert, setShowAlert] = useState(false)
let [addAccount, setAddAccount] = useState(false)
let [skMailAccounts, setSkMailAccounts] = useLocalStorage("skmail_tokens", [])
let [msg, setMsg] = useState("")
let [showPopper, setShowPopper] = useState([false])
let [cred, setCred] = useState({
  email : "", 
  password : ""
})

let submitFun = async () => {
  if(!cred?.email?.includes("@skmail.com")) {
    setShowAlert(true)
    setMsg("Invalid email, email should contain @skmail.com")
    setTimeout(() => {
    setShowAlert(false)
    }, 5000);
  } else {
    setShowAlert(false)
    setMsg("")
    let result = await userDataByToken(cred)
    if(result?.data?.status === 200) {
      let tokenObj = {
        token : result?.data?.token,
        token_secret : result?.data?.token_secret
      }
      let credResult = await getUserDataByTaken(JSON.stringify(tokenObj))
    // Then you can spread skMailAccounts into itself with the new tokenObj
    credResult?.data?.map((credItem) => (      
      setSkMailAccounts(prevState => [
          ...prevState, credItem
      ])
    ))
    }
  }
}

let newAccountFilterFun = (accountId) => {
  let newAccountFiltered = skMailAccounts.filter(account => account._id !== accountId);
  console.log(newAccountFiltered)
  setSkMailAccounts(newAccountFiltered); // update state
  localStorage.setItem("skmail_tokens", JSON.stringify(newAccountFiltered)); // update localStorage
}

  return (
    <>
    <button class="btn bg-gradient-to-br from-purple-500 to-indigo-600 font-medium text-white mt-3 mx-3" onClick={()=>setMessage(true)}>
    <i class="fa-solid fa-s"></i>
                  kMail
                </button>

                <div className={`popper-root ${message && 'show'}`} x-ref="popperRoot" style={{position: 'fixed', inset: '0px 0px auto auto', margin: '0px', transform: 'translate(-450px, 58px)'}} data-popper-placement="bottom-end">
          <div x-data="{activeTab:'tabAll'}" className="popper-box mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg border border-slate-150 bg-white shadow-soft dark:border-navy-800 dark:bg-navy-700 dark:shadow-soft-dark sm:m-0 sm:w-80" style={{width : '35vw'}}>
            <div className="rounded-t-lg bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-navy-200">
              <div className="flex items-center justify-between px-4 pt-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-slate-700 dark:text-navy-100">
                    Login by SkMail
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
            </div>
            <div className="tab-content flex flex-col overflow-hidden">
              <div className="is-scrollbar-hidden space-y-4 overflow-y-auto px-4 py-4" style={{overflowY : 'auto', height : '420px'}}>
              <div className="text-center">
  <img className="mx-auto h-16 w-16" src="/assets/images/app-logo.svg" alt="logo" />
    <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
      SkMail
    </h2>
</div>

<div style={{display : skMailAccounts?.length === 0 || addAccount === true ? 'block' : "none"}}>
<label className="block text-align-left">
  <span>Email</span>
  <input className={`form-input mt-1.5 w-full border rounded-lg ${showAlert === true ? "border-error" : "border-slate-300"} bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent `} placeholder="Email" type="email" name="email" onChange={(e)=> setCred({...cred, email : e.target.value})} value={cred.email} />
  {showAlert === true && (<span className="text-tiny+ text-error">Invalid email, email should contain @skmail.com</span>)}
</label>
              <label className="block text-align-left">
  <span>Password</span>
  <input className={`form-input mt-1.5 w-full border rounded-lg ${showAlert === true ? "border-error" : "border-slate-300"} bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent `} placeholder="Password" type="password" name="password" onChange={(e)=> setCred({...cred, password : e.target.value})} value={cred.password} />
</label>
</div>
{skMailAccounts?.map((mailAccounts) => (
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2" style={{display : skMailAccounts?.length === 0 || addAccount === true ? 'none' : "block"}}>
<div className="card items-center justify-between lg:flex-row">
  <div className="flex flex-col items-center p-4 text-center sm:p-5 lg:flex-row lg:space-x-4 lg:text-left">
    <div className="avatar h-18 w-18 lg:h-12 lg:w-12">
      <img className="rounded-full" src="/assets/images/avatar/avatar-20.jpg" alt="avatar" />
    </div>
    <div className="mt-2 lg:mt-0">
      <div className="flex items-center justify-center space-x-1">
        <h4 className="text-base font-medium text-slate-700 line-clamp-1 dark:text-navy-100">
          {mailAccounts?.fname}  {mailAccounts?.lname}
        </h4>
        {/* <button className="btn hidden h-6 rounded-full px-2 text-xs font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25 lg:inline-flex">
          Follow
        </button> */}
      </div>
      <p className="text-xs+">{mailAccounts?.email}</p>
    </div>
    <button className="btn mt-4 rounded-full border border-slate-200 font-medium text-primary hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-500 dark:text-accent-light dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90 lg:hidden">
      Follow
    </button>
  </div>
  <div x-data="usePopper({placement:'bottom-end',offset:4})"className="absolute top-0 right-0 m-2 lg:static">
    <button x-ref="popperRef" className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25" onClick={()=> setShowPopper(!showPopper)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </button>
    <div x-ref="popperRoot" className={`popper-root ${showPopper === true ? "show" : ""}`} style={{position: 'fixed', inset: '0px 0px auto auto', margin: '0px', transform: 'translate(-28px, 230px)'}}>
      <div className="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
        <ul>
          <li onClick={()=> newAccountFilterFun(mailAccounts?._id)}>
            <a href="#" className="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Remove</a>
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
    <button className="btn bg-info font-medium text-white hover:bg-info-focus focus:bg-info-focus active:bg-info-focus/90">
                  Info
                </button>
    </div>
  </div>
</div>

</div>
))}
  <button className="btn bg-info font-medium text-white hover:bg-info-focus focus:bg-info-focus active:bg-info-focus/90 mt-3" onClick={()=> setAddAccount(true)} style={{marginLeft : '11vw',display : skMailAccounts?.length === 0 || addAccount === true ? 'none' : "block"}}>
    add Account
  </button>

{/* {showAlert === true && <ErrorAlert msg={msg} />} */}
  <button className="btn mx-2 border border-secondary/30 bg-secondary/10 font-medium text-secondary hover:bg-secondary/20 focus:bg-secondary/20 active:bg-secondary/25 dark:border-accent-light/30 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25" onClick={()=> {setMessage(false)
  setAddAccount(false)
  }} style={{display : skMailAccounts?.length === 0 || addAccount === true ? '' : "none"}}>
    Cancel
  </button>
  <button className="btn border border-primary/30 bg-primary/10 font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:border-accent-light/30 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25" onClick={submitFun} style={{display : skMailAccounts?.length === 0 || addAccount === true ? '' : "none"}}>
    Login
  </button>

              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default OAuthBySkMail

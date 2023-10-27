import os
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Homepage"

@app.route("/create/component", methods=['POST'])
def create_component():
    data = request.get_json()
    for i, component in enumerate(data):
        if 'ComponentName' in component:
            dir_path = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console\src\Components\Pages\Admin\Email-Api\{component['ComponentName']}"
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)
                with open(f"{dir_path}/{component['ComponentName']}.js", 'w') as f:
                    f.write(f'''
    /* eslint-disable */
    import React from 'react'
    import MainSidebar from '../../../../Shared/MainSidebar'
    import Header from '../../../../Shared/Header'
    import {{scopes, plans}} from '../../../../../Content/Api/scopes'
    import {{getApi{component['ComponentName']}Data, daleteApi{component['ComponentName']}Data, updateApi{component['ComponentName']}Data}} from '../../../../../Services/Api/{component['ComponentName']}Service'
    const {component['ComponentName']} = () => {{
      let [details, setDetails] = useState({{
        scopeDropdown : false,
        scopes : [ 
          {{
          text : "User:Read",
          val : "UR"
      }},
      {{
          text : "User:Write",
          val : "UW"
      }}
    ],
    whichPlan : 'Free',
    planDropDown : false
    }})

      const handleKeyDown = (event) => {{
        if (event.key === 'Backspace' && event.target.value === '') {{
          setDetails(prevState => {{
            const newScopes = [...prevState.scopes];
            newScopes.pop(); // Remove last item
            return {{ ...prevState, scopes: newScopes }};
        }});
        }}
    }};
    return (
        <>
        <div>
        {{/* App preloader*/}}
        {{/* <div className="app-preloader fixed z-50 grid h-full w-full place-content-center bg-slate-50 dark:bg-navy-900">
          <div className="app-preloader-inner relative inline-block h-48 w-48" />
        </div> */}}
        {{/* Page Wrapper */}}
        <div id="root" className="min-h-100vh flex grow bg-slate-50 dark:bg-navy-900" x-cloak>
          {{/* Sidebar */}}
          <div className="sidebar print:hidden">
            {{/* Main Sidebar */}}
            <MainSidebar />
            {{/* Sidebar Panel */}}

          </div>
          {{/* App Header Wrapper*/}}
          <Header />
          {{/* Mobile Searchbar */}}
          
          <div className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-navy-700 sm:hidden" style={{{{display : 'none'}}}}>
            <div className="flex items-center space-x-2 bg-slate-100 px-3 pt-2 dark:bg-navy-800" style={{{{display : 'none'}}}}>
              <button className="btn -ml-1.5 h-7 w-7 shrink-0 rounded-full p-0 text-slate-600 hover:bg-slate-300/20 active:bg-slate-300/25 dark:text-navy-100 dark:hover:bg-navy-300/20 dark:active:bg-navy-300/25">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <input x-effect="$store.global.isSearchbarActive && $nextTick(() => $el.focus() );" className="form-input h-8 w-full bg-transparent placeholder-slate-400 dark:placeholder-navy-300" type="text" placeholder="Search here..." />
            </div>
            <div className="is-scrollbar-hidden flex shrink-0 overflow-x-auto bg-slate-100 px-2 text-slate-600 dark:bg-navy-800 dark:text-navy-200">
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
              <button className="btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5">
                Tasks
              </button>
            </div>
            <div className="is-scrollbar-hidden overflow-y-auto overscroll-contain pb-2">
              <div className="is-scrollbar-hidden mt-3 flex space-x-4 overflow-x-auto px-3">
                <a href="apps-kanban.html" className="w-14 text-center">
                  <div className="avatar h-12 w-12">
                    <div className="is-initial rounded-full bg-success text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                <p className="text-xs uppercase text-slate-400 dark:text-navy-300">
                  Recent
                </p>
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
          {{/* Right Sidebar */}}
          <div>
            <div className="fixed inset-0 z-[150] bg-slate-900/60 transition-opacity duration-200"  style={{{{display : 'none'}}}}/>
            <div className="fixed right-0 top-0 z-[151] h-full w-full sm:w-80" style={{{{display : 'none'}}}}>
              <div className="relative flex h-full w-full transform-gpu flex-col bg-white transition-transform duration-200 dark:bg-navy-750">
                <div className="flex items-center justify-between py-2 px-4">
                  <p className="flex shrink-0 items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">25 May, 2022</span>
                  </p>
                  <p className="flex shrink-0 items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span className="text-xs">Projects</span>
                  </p>
                  <p className="flex shrink-0 items-center space-x-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs">Activity</span>
                  </p>
                  <button className="btn -mr-1 h-6 w-6 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                    <div className="swiper mt-3 px-3" x-init="$nextTick(()=>new Swiper($el,{{  slidesPerView: 'auto', spaceBetween: 16}}))">
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                          <div x-init="$nextTick(() => {{ $el._x_chart = new ApexCharts($el,pages.charts.stockMarket1); $el._x_chart.render() }});" />
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
                          <div x-init="$nextTick(() => {{ $el._x_chart = new ApexCharts($el,pages.charts.stockMarket2); $el._x_chart.render() }});" />
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </button>
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </button>
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                              </button>
                              <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                          <span className="font-medium text-slate-600 dark:text-navy-100">35GB</span>
                          of 1TB
                        </p>
                        <a href="#" className="text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">Upgrade</a>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M7 11l5-5m0 0l5 5m-5-5v12" />
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M7 11l5-5m0 0l5 5m-5-5v12" />
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M7 11l5-5m0 0l5 5m-5-5v12" />
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="h-18" />
                </div>
                <div className="is-scrollbar-hidden overflow-y-auto overscroll-contain pt-1">
                  <div className="mx-3 flex flex-col items-center rounded-lg bg-slate-100 py-3 px-8 dark:bg-navy-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary dark:text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={{2}}>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M7 11l5-5m0 0l5 5m-5-5v12" />
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </button>
                    <button className="btn h-9 rounded-full py-0 px-4 hover:bg-slate-300/20 hover:text-primary focus:bg-slate-300/20 focus:text-primary active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:hover:text-accent dark:focus:bg-navy-300/20 dark:focus:text-accent dark:active:bg-navy-300/25">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </button>
                    <button className="btn h-9 rounded-full py-0 px-4 hover:bg-slate-300/20 hover:text-primary focus:bg-slate-300/20 focus:text-primary active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:hover:text-accent dark:focus:bg-navy-300/20 dark:focus:text-accent dark:active:bg-navy-300/25">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {{/* Main Content Wrapper */}}
                    <main className="main-content w-full pb-8">
          <div className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
              <div className="col-span-12 lg:col-span-12">
          <div className="card px-4 pb-4 sm:px-5">
  <div className="my-3 flex h-8 items-center justify-between">
    <h2 className="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
      {component['text']}
    </h2>
  </div>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <div className="max-w-xl" onClick={{()=> setDetails(prevState => ({{
  ...prevState, 
  scopeDropdown : false
}}))}}>
    <p>
    Select the <a className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent cursor-pointer">plan(s) </a> in which this API is included. It may be part of multiple plans. The price of each plan varies, and different plans are available to cater to individual and professional needs
    </p>
    <div className="inline-space mt-5">
      <label className="block">
        <span>In which plan is this API included?</span>
        <select className="mt-1.5 w-full tomselected ts-hidden-accessible" x-init="$el._x_tom = new Tom($el,{{create: true,sortField: {{field: 'text',direction: 'asc'}}}})" id="tomselect-5" tabIndex={{-1}}>
          {{plans?.map((plan) => (
          <option>{{plan}}</option>
          ))}}
          </select>
          <div className={{`ts-wrapper mt-1.5 w-full single full has-items ${{details?.planDropDown === true ? "focus input-active dropdown-active" : "input-hidden"}}`}} onClick={{()=> setDetails(prevState => ({{
  ...prevState, 
  planDropDown : !prevState.planDropDown
}}))}}>
          {{/* focus input-active dropdown-active */}}
            <div className="ts-control">
              <div data-value="Corporate event" className="item" data-ts-item>{{details?.whichPlan}}</div>
            <input type="select-one" autoComplete="off" size={{1}} tabIndex={{0}} role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="tomselect-5-ts-dropdown" id="tomselect-5-ts-control" aria-activedescendant="tomselect-5-opt-1" /></div>
            <div className="ts-dropdown single" style={{{{display: details?.planDropDown === true ? 'block' : 'none', visibility: 'visible'}}}}>
              
              <div role="listbox" tabIndex={{-1}} className="ts-dropdown-content" id="tomselect-5-ts-dropdown">
                {{plans?.map((plan) => (
                <div key={{plan}} data-selectable data-value={{plan.toLowerCase()}} className={{`option ${{details?.whichPlan === plan.toLowerCase() ? "active" : ""}}`}} role="option" id="tomselect-5-opt-3" onClick={{()=> setDetails(prevState => ({{
                  ...prevState, 
                  whichPlan : plan
                }}))}}>{{plan}}</div>
                ))}}
              </div>
              
              </div>
              </div>
      </label>
    </div>
  </div>
  <div className="max-w-xl">
    <p>
      <a className="text-primary transition-colors hover:text-primary-focus dark:text-accent-light dark:hover:text-accent cursor-pointer">Scopes </a> 
      are permissions that an API requires to ensure its protection. They grant only the necessary permissions, eliminating confusion and making the API easier to use and understand.
    </p>
    <div className="inline-space mt-5">
  <label className="block">
    <span>Select Scopes</span>
    <select x-init="$el._x_tom = new Tom($el)" className="mt-1.5 w-full tomselected ts-hidden-accessible" multiple="multiple" placeholder="Select Scopes..." autoComplete="off" id="tomselect-6" tabIndex={{-1}} aria-activedescendant="tomselect-6-opt-3">
      <option value>Select Scopes...</option>
    {{scopes?.map((scope) => (
          <option key={{scope.text}} value={{scope.val}} selected>{{scope.text}}</option>
        ))}}

      </select>
      <div className={{`ts-wrapper mt-1.5 w-full multi has-items ${{ details.scopeDropdown === true ? "focus input-active dropdown-active" : ""}}`}} onClick={{()=> setDetails(prevState => ({{
  ...prevState, 
  scopeDropdown : !prevState.scopeDropdown
}}))}}>
      <div className="ts-control">
        {{details?.scopes?.map((scope) => (
        <div data-value={{scope?.val}} className="item" data-ts-item>{{scope?.text}}</div>
        ))}}
      <input type="select-multiple" autoComplete="off" size={{1}} tabIndex={{0}} role="combobox" aria-haspopup="listbox" aria-expanded="false" aria-controls="tomselect-6-ts-dropdown" id="tomselect-6-ts-control" placeholder="Select Scopes..." onKeyDown={{handleKeyDown}}
 />
      </div>
      <div className="ts-dropdown multi" style={{{{display: details.scopeDropdown === true ? 'block' : "none", visibility: 'visible'}}}}>
      <div role="listbox" tabIndex={{-1}} className="ts-dropdown-content" id="tomselect-6-ts-dropdown">
      {{scopes?.map((scope) => (
    <div key={{scope.text}} data-selectable data-value={{scope.val}} className={{`option ${{details?.scopes.map(s => s.text).includes(scope.text) ? "active" : ""}}`}} role="option" id="tomselect-6-opt-1" onClick={{() => setDetails(prevState => {{
      const newScopes = [...prevState.scopes];
      const scopeIndex = newScopes.findIndex(s => s.text === scope.text);
      if (scopeIndex !== -1) {{
        // If scope exists in scopes array, remove it
        newScopes.splice(scopeIndex, 1);
      }} else {{
        // If scope does not exist in scopes array, add it
        newScopes.push(scope);
      }}
      return {{ ...prevState, scopes: newScopes }};
    }})}}>{{scope.text}}</div>
        ))}}
        </div>
        </div></div>
  </label>
</div>

  </div>
  </div>
</div>
  </div>
</div>
</main>
        </div>
        {{/* 
        This is a place for Alpine.js Teleport feature 
        @see https://alpinejs.dev/directives/teleport
      */}}
        <div id="x-teleport-target" />
      </div>
        </>
    )
    }}

    export default {component['ComponentName']}
    ''')
            dir_path2 = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console\src\Services\Api\{component['ComponentName']}Service"
            with open(f"{dir_path2}.js", 'w') as f:
                f.write(f'''
                import axios from 'axios'

let apiUrl = 'http://localhost:4009/api/{component['path']}/'

let AddApi{component['ComponentName']}Data = async (data) => {{
return await axios.post(`${{apiUrl}}`, data);
}}
let getApi{component['ComponentName']}Data = async () => {{
return await axios.get(`${{apiUrl}}`);
}}
let getApi{component['ComponentName']}DataById = async (id) => {{
return await axios.get(`${{apiUrl}}${{id}}`);
}}
let daleteApi{component['ComponentName']}Data = async (id) => {{
return await axios.delete(`${{apiUrl}}${{id}}`);
}}
let updateApi{component['ComponentName']}Data = async (id, data) => {{
return await axios.put(`${{apiUrl}}${{id}}`, data);
}}

export {{daleteApi{component['ComponentName']}Data, getApi{component['ComponentName']}Data, getApi{component['ComponentName']}DataById, AddApi{component['ComponentName']}Data, updateApi{component['ComponentName']}Data}}
                ''')

            dir_path3 = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console_backend\controller\Api\{component['ComponentName']}Controller"
            with open(f"{dir_path3}.js", 'w') as f:
                f.write(f'''
                const routes = require("express").Router();
const {component['ComponentName']} = require("../../models/{component['ComponentName']}");

routes.post("/",  async(req,res) => {{
    let result = await {component['ComponentName']}.create(req.body)
    res.send({{status : 200, success : true, data : result }})
}})

routes.get("/:id", async (req,res)=> {{
        let id = req.params.id;
        let result = await {component['ComponentName']}.find({{_id : id}})
        res.send(result)
}})

routes.get("/", async (req,res)=> {{
        let result = await {component['ComponentName']}.find({{}})
        res.send(result)
}})

routes.delete("/:id", async (req,res)=> {{
        let id = req.params.id;
        let result = await {component['ComponentName']}.findAndDelete({{_id : id}})
        res.send({{status : 200, success : true, data : result }})
}})

routes.put('/:id', async (req,res) => {{
    let id = req.params.id;
    await {component['ComponentName']}.updateMany({{_id : id}}, req.body)
       // Fetch the updated documents
let result = await {component['ComponentName']}.find({{ _id: id }});

        res.send({{status : 200, success : true, updatedData : result}})
}})
module.exports = routes;
                ''')
            dir_path4 = fr"C:\Users\Aliasger B\1001_ai_mail_whole_console\1001_ai_mail_whole_console_backend\models\Api\{component['ComponentName']}"
            with open(f"{dir_path4}.js", 'w') as f:
                f.write(f'''
                require("../../config/database")
const mongoose = require("mongoose");

const Admin = mongoose.Schema({{
''')
                for item in component['SchemaItem']:
                    name, sc_type = item.split(':')
                    f.write(f'''
                        {name} : {sc_type}
    }})
    module.exports = mongoose.model("admin", Admin);
                    ''')
        else:
            print(f"Component {i} does not have a 'ComponentName'")


    return "200"

#  flask --app createComponent --debug run
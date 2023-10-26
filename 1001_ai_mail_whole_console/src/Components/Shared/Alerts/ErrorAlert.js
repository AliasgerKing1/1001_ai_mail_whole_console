
/* eslint-disable */
import React from 'react';
const ErrorAlert = ({msg}) => {

  return (
    <>
<div className="alert flex overflow-hidden rounded-lg bg-error/10 text-error dark:bg-error/15 mt-2">
  <div className="flex flex-1 items-center space-x-3 p-4">
 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
</svg>

    <div className="flex-1">{msg}</div>
  </div>
  <div className="w-1.5 bg-error" />
</div>

    </>
  )
}

export default ErrorAlert
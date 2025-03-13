import React from 'react'
import { AiFillExclamationCircle } from "react-icons/ai";

type FormSuccessProps = {
    message?: string
}

const FormSuccess = ({message}: FormSuccessProps) => {
    if (!message) return null
  return (
    <div className="bg-green-600/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-600">
        <AiFillExclamationCircle className='w-4 h-4'/>
        {message}
    </div>
  )
}

export default FormSuccess
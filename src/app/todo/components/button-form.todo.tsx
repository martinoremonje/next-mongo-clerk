import React from 'react'
import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa6";

const ButtonForm = () => {

    const {pending} = useFormStatus()

  return (
    <button type='submit' className='border rounded border-gray-300 w-28 p-2 grid place-items-center'>
        {
            
            pending ? (<span className='block animate-spin'>
                <FaSpinner className='transform rotate-90'/>
            </span>) : 'Submit'
        }
    </button>
  )
}

export default ButtonForm
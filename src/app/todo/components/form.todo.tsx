"use client"

import React, { useRef } from 'react'
import { createTodo } from '../actions/todo.action'
import ButtonForm from './button-form.todo'
import toast from 'react-hot-toast'
import { TodoZodSchema } from '../schema/todo.zod.schema'
import { ZodError } from 'zod'

const FormTodo = () => {

    
    // const formRef = useRef<HTMLFormElement>(null)
    
    const handleSubmit = async  (data: FormData) =>{
      
        const title = data.get("title") as string

      try {
        
        TodoZodSchema.parse({title})
        const res = await createTodo(title)
        if(!res.success){
          return toast.error(res.message)
        }
        return toast.success('Añadido con exito!')
      } catch (error) {
        if(error instanceof ZodError){
          console.log(error.issues)
          
          return error.issues.map(issue => toast.error(issue.message))
        }
      
      }             
        // formRef.current?.reset()
    }
  return (
    <form action={handleSubmit} className='flex'>
        <input type="text" name='title' className='border rounded border-gray-300 mr-2 p-2 w-full'/>
        <ButtonForm />
    </form>
  )
}

export default FormTodo
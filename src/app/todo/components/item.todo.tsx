'use client'

import React from 'react'
import { TodoInterface } from '../interface/todo.interface'
import { FaTrashCan } from "react-icons/fa6";
import { useTransition } from 'react';
import { deleteTodo } from '../actions/todo.action';
import toast from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa6";

interface ItemTodoProps{
    todo: TodoInterface
}

const ItemTodo = ({todo}: ItemTodoProps) => {

  const [isPending, startTransition] = useTransition();
 
  const handleClickRemove = async (id: string) =>{
    
    
      const res = await deleteTodo(id)
      if(res.error){
        return toast.error(res.error)
      } else {
        return toast.success("Remove con exito!")
      }
     
  
     
    
  }

  return (
    <div className='border border-gray-400 rounded mb-2 p-2 flex justify-between item-center'>
        <span>{todo.title}</span>       
        <button onClick={()=> startTransition(()=> handleClickRemove(todo.id))}>{
        isPending ? (<span className='block animate-spin'>
                        <FaSpinner className='transform rotate-90'/>
                    </span>) : <FaTrashCan />
}</button>
    </div>
  )
}

export default ItemTodo
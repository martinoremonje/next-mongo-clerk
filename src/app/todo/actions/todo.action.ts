"use server";

import { prisma } from '../../../libs/pismadb' // Corregido el path de importación
import { revalidatePath } from 'next/cache';
import { TodoZodSchema } from '../schema/todo.zod.schema';
import { ZodError } from 'zod';
import { auth, currentUser } from '@clerk/nextjs/server'

interface TodoResponse {
  success: boolean;
  message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {
  const user = await currentUser() // Usamos auth para obtener el userId
  
  console.log(user)

  if(!user){
return {
  success: false,
  message: "user not found"
}
  }


  try {
    TodoZodSchema.parse({ title });
    await prisma.todo.create({
      data: {
        title,
        userId: user.id, // Agregamos userId a los datos del todo
      },
    });
    revalidatePath('/todo');
    return {
      success: true,
      message: 'Data created',
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return {
        success: false,
        message: 'Zod validation error occurred',
      };
    }

    console.error(error); // Mejoramos el registro de errores
    return {
      success: false,
      message: 'Error creating todo in backend',
    };
  }
};

export const deleteTodo = async (id: string) => {
  if (!id || !id.trim()) {
    return {
      error: 'Id is required, backend error',
    };
  }

  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    revalidatePath('/todo');
    return {
      success: true,
    };
  } catch (error) {
    console.error(error); // Mejoramos el registro de errores
    return {
      error: 'Error removing todo in backend',
    };
  }
};

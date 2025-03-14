"use client";

import React from "react";
import { createTodo } from "../actions/todo.action";
import ButtonForm from "./button-form.todo";
import toast from "react-hot-toast";
import { TodoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";

// Tipos de TypeScript definidos en este archivo
type Params = {
  slug: string; // Ejemplo: Rutas dinámicas como /todo/[slug]
};

type SearchParams = {
  [key: string]: string | string[] | undefined; // Manejo de query strings
};

type Todo = {
  id: string;          // ID único del TODO
  title: string;       // Título del TODO
  userId: string;      // ID del usuario al que pertenece el TODO
  createdAt: string;   // Fecha de creación en formato ISO
};

type FormDataTodo = {
  title: string;       // Datos enviados desde el formulario
};

type CreateTodoResponse = {
  success: boolean;    // Indica si la operación fue exitosa
  message: string;     // Mensaje adicional (éxito o error)
};

const FormTodo: React.FC = () => {
  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string; // Obtén el título desde FormData

    try {
      // Validación con Zod
      const todoData: FormDataTodo = { title };
      TodoZodSchema.parse(todoData);

      // Creación del TODO
      const res: CreateTodoResponse = await createTodo(title);

      if (!res.success) {
        return toast.error(res.message); // Notifica error
      }

      return toast.success("Añadido con éxito!"); // Notifica éxito
    } catch (error) {
      // Manejo de errores de validación
      if (error instanceof ZodError) {
        console.log(error.issues);
        return error.issues.map((issue) => toast.error(issue.message));
      }
    }
  };

  return (
    <form action={handleSubmit} className="flex">
      <input
        type="text"
        name="title"
        className="border rounded border-gray-300 mr-2 p-2 w-full"
      />
      <ButtonForm />
    </form>
  );
};

export default FormTodo;

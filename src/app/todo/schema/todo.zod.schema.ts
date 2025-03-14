import { z } from "zod";

export const TodoZodSchema = z.object({
    title: z.string().trim().min(1, {message: "Minimo un caracter"}).max(50).nonempty({message:"No puede estar vacio"})
})
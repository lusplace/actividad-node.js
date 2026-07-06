import * as z from "zod"; 

export const postSchema = z.object({
  name: z.string().min(4, "El nombre es obligatorio y precisa minimo 4 caracteres").max(255, "no mas de 255 caracteres para el nombre")
});

export const putSchema = z.object({
  name: z.string().min(4, "El nombre es obligatorio y precisa minimo 4 caracteres").max(255, "no mas de 255 caracteres para el nombre"),
  id: z.number().min(0, "id solo puede ser mayor que 0")
});

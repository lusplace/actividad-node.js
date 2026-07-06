import * as z from "zod"; 

export const postSchema = z.object({
  title: z.string().min(4, "El nombre es obligatorio y precisa minimo 4 caracteres").max(255, "no mas de 255 caracteres para el nombre"),
  releaseDate: z.date().max(new Date(3026, 2, 10, 2, 30), "nada de viajes en el tiempo muy bestias"),
  studioId: z.number().min(0, "introduce un id de studio valido y mayor que '0")
});

export const putSchema = z.object({
  id: z.number().min(0, "id solo puede ser mayor que 0"),
  title: z.string().min(4, "El nombre es obligatorio y precisa minimo 4 caracteres").max(255, "no mas de 255 caracteres para el nombre"),
  releaseDate: z.date().max(new Date(3026, 2, 10, 2, 30), "nada de viajes en el tiempo muy bestias"),
  studioId: z.number().min(0, "introduce un id de studio valido y mayor que '0")
});

import * as z from "zod"; 

export const registerSchema = z.object({
  firstName: z.string().min(3, "Longitud mínima 3").max(50, "Longitud máxima 50"),
  lastName: z.string().min(3, "Longitud mínima 3").max(50, "Longitud máxima 50"),
  email: z.email("El email no es válido"),
  username: z.string().min(3, "Longitud mínima 3").max(50, "Longitud máxima 50"),
  password: z.string().regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})$/, "La constraseña debe tener mínimo 8 caracteres y contener una minúscula, mayúscula y número"),
  // password regex includes a lowercase letter casue i wanted
});

export const loginSchema = z.object({
  email: z.email("El email no es válido")
});

import z from "zod";
import { loginSchema } from "../validations/loginSchema";


export type LoginFormValues = z.infer<typeof loginSchema>;
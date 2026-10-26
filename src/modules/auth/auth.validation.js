import { z } from "zod";
import { genderEnum, roleEnum } from "../../common/index.js";

export const loginScema = z.strictObject({
  email: z.email(),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z])(?=.*[\d]).{6,}$/, {
      error:
        "Password must be at least 6 charachters and includes at least one digit, at least one lowercase, and at least uppercase",
    }),
});

export const login = z.object({
  body: loginScema,
  query: z.strictObject({
    lang: z.enum(["ar", "en"]).default("en"),
  }),
});

export const signupScema = loginScema
  .extend({
    firstName: z.string().regex(/^(?![A-Z]+$)[A-Za-z\u0621-\u064A]+$/, {
      error: "First name can't be fully in uppercase",
    }),

    lastName: z.string().regex(/^(?![A-Z]+$)[A-Za-z\u0621-\u064A]+$/, {
      error: "First name can't be fully in uppercase",
    }),

    phone: z.string().regex(/^(002|\+2)?01[0125][0-9]{8}$/, {
      error: "Please provide a valid Egyptian number",
    }),

    gender: z.enum(genderEnum).default(genderEnum.Male),

    role: z.enum(roleEnum).default(roleEnum.User),

    age: z
      .number()
      .min(18, { error: "Age must be at least 18" })
      .max(60, { error: "Age must be at most 60" })
      .optional(),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password == data.confirmPassword;
    },
    {
      error: "Password and comfirm password mismatch",
      //   message: "Password and comfirm password mismatch",
      path: ["confirmPassword"],
    },
  );

export const signup = z.object({
  body: signupScema,
});

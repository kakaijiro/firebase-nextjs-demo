import z from "zod";

export const passwordValidation = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
    "password must include 8 letters, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 number, and at least 1 special character"
  );

export const registerUserSchema = z
  .object({
    email: z.email(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: passwordValidation,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

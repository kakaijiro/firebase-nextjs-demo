"use server";

import { auth } from "@/firebase/server";
import { registerUserSchema } from "@/validation/registerUser";

export const registerUser = async (data: {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}) => {
  const validation = registerUserSchema.safeParse(data);

  // if validation failed
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  // if validation passed
  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
  } catch (e: any) {
    return {
      error: true,
      message: e.message ?? "Could not register user",
    };
  }
};

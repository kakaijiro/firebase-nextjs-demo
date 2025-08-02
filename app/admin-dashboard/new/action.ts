"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";
import z from "zod";

type Props = {
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  status: "draft" | "for-sale" | "withdrawn" | "sold";
};

export const createProperty = async (data: Props, authToken: string) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(data);
  if (!validation.success) {
    return {
      error: true,
      message:
        validation.error.issues[0]?.message ??
        "An error occured on data validation",
    };
  }

  const property = await firestore.collection("properties").add({
    ...data,
    created: new Date(),
    updated: new Date(),
  });
  return {
    propertyId: property.id,
  };
};

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

export const savePropertyImages = async (
  {
    propertyId,
    images,
  }: {
    propertyId: string;
    images: string;
  },
  authToken: string
) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const schema = z.object({
    propertyId: z.string(),
    images: z.array(z.string()),
  });
  const validation = schema.safeParse({ propertyId, images });
  // if failed
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }
  // if successed, add images to db
  await firestore.collection("properties").doc(propertyId).update({
    images,
  });
};

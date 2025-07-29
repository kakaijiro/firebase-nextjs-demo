"use server";

import { auth, firestore } from "@/firebase/server";
import { propertyDataSchema } from "@/validation/propertySchema";

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
  token: string;
};

export const saveNewProperty = async (data: Props) => {
  const { token, ...propertyData } = data;
  const verifiedToken = await auth.verifyIdToken(token);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const validation = propertyDataSchema.safeParse(propertyData);
  if (!validation.success) {
    return {
      error: true,
      message:
        validation.error.issues[0]?.message ??
        "An error occured on data validation",
    };
  }

  const property = await firestore.collection("properties").add({
    ...propertyData,
    created: new Date(),
    updated: new Date(),
  });
  return {
    propertyId: property.id,
  };
};

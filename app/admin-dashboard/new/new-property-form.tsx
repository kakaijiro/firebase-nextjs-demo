"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { propertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { z } from "zod";
import { saveNewProperty } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const token = await auth?.currentUser?.getIdToken();

    if (!token) return;
    const response = await saveNewProperty({ ...data, token });
    if (!!response.error) {
      toast.error("Error!", {
        description: response.error,
      });
      return;
    }
    toast.success("Success!", {
      description: "Property created successfully",
    });
    router.push("/admin-dashboard");
    console.log({ response });
  };
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <React.Fragment>
            <PlusCircleIcon />
            Create Property
          </React.Fragment>
        }
      />
    </div>
  );
}

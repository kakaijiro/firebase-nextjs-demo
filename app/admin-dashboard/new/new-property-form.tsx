"use client";

import PropertyForm from "@/components/property-form";
import { propertyDataSchema } from "@/validation/propertySchema";
import { z } from "zod";

export default function NewPropertyForm() {
  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {};
  return (
    <div>
      <PropertyForm handleSubmit={handleSubmit} />
    </div>
  );
}

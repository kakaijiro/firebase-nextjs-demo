"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await auth?.loginWithGoogle();
          router.refresh();
        } catch (e) {}
      }}
      className="w-full"
    >
      Continue with Google
    </Button>
  );
}

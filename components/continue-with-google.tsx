"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const router = useRouter();
  const auth = useAuth();

  return (
    <Button
      onClick={async () => {
        await auth?.loginWithGoogle();
        router.refresh();
      }}
      className="w-full"
    >
      Continue with Google
    </Button>
  );
}

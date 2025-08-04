import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResigterForm from "./register-form";
import Link from "next/link";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl fotn-bold">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <ResigterForm />
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link href="/login" className="pl-4 underline hover:bg-slate-50">
          Log in here
        </Link>
      </CardFooter>
    </Card>
  );
}

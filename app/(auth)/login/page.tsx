import ContinueWithGoogleButton from "@/components/continue-with-google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <ContinueWithGoogleButton />
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const handleGoogleLogin = async () => {
    // This will be implemented once Supabase is connected
    console.log("Google login clicked - waiting for Supabase integration");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your laundry management account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { GiWashingMachine } from "react-icons/gi";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented once Supabase is connected
    console.log("Standard login clicked - waiting for Supabase integration", { email, password });
  };

  const handleGoogleLogin = async () => {
    // This will be implemented once Supabase is connected
    console.log("Google login clicked - waiting for Supabase integration");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <GiWashingMachine className="h-20 w-20 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-blue-400 to-purple-500 opacity-75 rounded-full blur-md" />
              <div className="absolute inset-0 bg-white/20 rounded-full shadow-lg" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">LaundryKeeper Pro</CardTitle>
          <CardDescription>
            Sign in to your laundry management account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

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
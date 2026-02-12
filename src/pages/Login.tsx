import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import emblem from "@/assets/ashoka-emblem.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Login Successful", description: "Welcome back to DigiVerify." });
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-[var(--shadow-elevated)] animate-fade-up">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <img src={emblem} alt="Emblem" className="h-14 w-14 mx-auto opacity-70" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your DigiVerify account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Aadhaar Number</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full gap-2 shadow-[var(--shadow-saffron)] transition-all duration-200 hover:scale-[1.02]" disabled={loading}>
                {loading ? "Signing in..." : <><LogIn className="h-4 w-4" /> Sign In</>}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/enroll" className="font-medium text-primary hover:underline transition-colors">
                Enroll Now
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;

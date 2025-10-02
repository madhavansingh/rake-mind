import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Train, Cpu } from "lucide-react";
import factoryBg from "@/assets/factory-bg.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No validation - any input works
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${factoryBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent animate-pulse-glow" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md px-6 animate-slide-up">
        <div className="glass-card p-8 rounded-2xl glow-border-cyan">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4 animate-pulse-glow">
              <Train className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              RakeMind
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Cpu className="w-4 h-4" />
              <p className="text-sm">AI-Powered Rake Formation System</p>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="engineer@sail.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/90">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary/20 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-background font-semibold py-6 text-lg glow-cyan transition-all duration-300 hover:scale-[1.02]"
            >
              Access System
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              SAIL Internal System • Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Version info */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>RakeMind v2.1.0 • Powered by Advanced AI/ML Algorithms</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

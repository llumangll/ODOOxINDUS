import { useState } from "react";
import { Box, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 text-primary">
          <Box className="h-10 w-10" />
          <span className="text-3xl font-bold tracking-tight">CoreInventory</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-primary">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card-background py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-borders relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 h-11 border border-borders rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-background/50 placeholder-text-secondary/70 transition-colors"
                  placeholder="admin@coreinventory.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-secondary" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 h-11 border border-borders rounded-lg focus:ring-primary focus:border-primary sm:text-sm bg-background/50 placeholder-text-secondary/70 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-borders rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-primary">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-borders" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card-background text-text-secondary">Or</span>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-borders rounded-lg shadow-sm bg-white text-sm font-medium text-text-primary hover:bg-background transition-colors"
              >
                Create new account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button, Input } from "@heroui/react";

import Link from "next/link";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const registerPages = Object.fromEntries(formData.entries());

    const passwordValue = registerPages.password;

    if (!passwordValue || passwordValue.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(passwordValue)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(passwordValue)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...registerPages,
    });

    if (data) {
      toast.success("Successfully register");
      router.push("/login");
    }

    if (error) {
      toast.error(error.message);
      return;
    }
  };
  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10  border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5  -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">Register !</div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-purple-600/50 focus-within:border-purple-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  startContent={<Mail className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-purple-600/50 focus-within:border-purple-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Profile Image URL
                </label>
                <Input
                  id="image"
                  placeholder="https://images.unsplash.com/..."
                  type="url"
                  name="image"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-purple-600/50 focus-within:border-purple-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-slate-200 hover:border-purple-600/50 focus-within:border-purple-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <Button
                type="submit"
                // isLoading={loading}
                className="w-full bg-purple-500 h-14 text-lg font-black  shadow-xl shadow-blue-600/20 group"
              >
                Create Account{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-purple-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Sign in
                </Link>
              </p>
              <Button
                onClick={handleGoogle}
                className={"bg-purple-500 w-full font-bold"}
              >
                Continue with google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

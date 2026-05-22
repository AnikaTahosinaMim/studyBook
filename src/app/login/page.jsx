"use client";

import { Button, Input } from "@heroui/react";

import Link from "next/link";

import { Mail, Lock, ArrowRight } from "lucide-react";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const loginPages = Object.fromEntries(formData.entries());

    const passwordValue = loginPages.password;

    setPasswordError("");

    if (!passwordValue || passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (!/[A-Z]/.test(passwordValue)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(passwordValue)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        ...loginPages,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("Successfully login");
        router.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    // const { data: tokenData, error } = await authClient.token();
    // console.log(tokenData,"tokens");
  };
  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10  border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5  -mr-16 -mt-16 blur-3xl"></div>
            <div className="text-center space-y-2 relative">login !</div>

            <div className="space-y-4">
              <Button
                onClick={handleGoogle}
                variant="bordered"
                className="w-full h-12 font-bold  border-slate-200 hover:bg-slate-50 transition-colors gap-3"
              >
                <Image
                  width={20}
                  height={20}
                  src="https://www.google.com/favicon.ico"
                  className="w-5 h-5"
                  alt="Google"
                />
                with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-100"></span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
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
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border p-2 rounded"
                />

                {/* Inline Error Message */}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 h-14 text-lg font-black  shadow-xl shadow-blue-600/20 group"
              >
                Sign In{" "}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                <Link
                  className={
                    "text-purple-600 font-black hover:underline underline-offset-4 transition-all"
                  }
                  href="/register"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

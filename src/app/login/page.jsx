"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Lightbulb } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login - IdeaVault";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    setLoading(false);

    if (data) {
      toast.success("Logged in successfully!");
      router.refresh();
      router.push(redirectTo);
    }

    if (error) {
      toast.error(error.message || "Invalid email or password");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <div className="mx-auto w-fit p-3 rounded-2xl bg-violet-600 text-white mb-3">
          <Lightbulb size={22} />
        </div>
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Log in to keep sharing and validating ideas
        </p>
      </div>

      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              required
              name="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
            />
          </div>

          <button
            type="button"
            onClick={() => toast("Please contact support to reset your password")}
            className="text-xs text-violet-600 text-right cursor-pointer"
          >
            Forgot Password?
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="text-xs text-slate-400 whitespace-nowrap">Or continue with</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <FcGoogle size={18} /> Sign in with Google
        </button>

        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-violet-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
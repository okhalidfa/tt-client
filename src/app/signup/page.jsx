"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Lightbulb } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

const validatePassword = (password) => {
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter";
  return null;
};

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign Up - IdeaVault";
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    setLoading(false);

    if (data) {
      toast.success("Account created successfully!");
      router.refresh();
      router.push(redirectTo);
    }

    if (error) {
      toast.error(error.message || "Something went wrong");
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
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Join IdeaVault and start sharing your ideas
        </p>
      </div>

      <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              required
              name="name"
              type="text"
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Photo URL</label>
            <input
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
            />
          </div>

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
            <p className="text-xs text-slate-400 mt-1">
              Min 6 characters, with uppercase and lowercase letters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating account..." : "Create Account"}
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
          <FcGoogle size={18} /> Sign up with Google
        </button>
   
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const SignupPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignupForm />
    </Suspense>
  );
};

export default SignupPage;
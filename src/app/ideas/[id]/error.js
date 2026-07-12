"use client";

import { RefreshCcw, AlertCircle, Home } from "lucide-react";
import Link from "next/link";

const ErrorPage = ({ error, reset }) => {
  return (
    <div className="min-h-[80vh] relative overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 flex items-center justify-center px-6 text-white">
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl animate-pulse" />
      <div className="absolute    bottom-20 right-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl animate-pulse" />

      <div className="relative max-w-xl w-full rounded-3xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl p-10 md:p-14 text-center">
        <div className="mx-auto w-fit p-5 rounded-full bg-red-500/10 border border-red-400/20 mb-6">
          <AlertCircle className="h-12 w-12 text-red-400" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold">Something went wrong</h2>

        <p className="mt-4 text-slate-300 leading-relaxed">
          We could not load this idea right now. Please try again.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          <Link
            href="/ideas"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition"
          >
            <Home size={18} />
            Back To Ideas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;


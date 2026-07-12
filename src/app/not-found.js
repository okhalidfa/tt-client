import Link from "next/link";
import { Home, Lightbulb } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] relative overflow-hidden flex items-center justify-center px-6 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 text-white">
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse" />

      <div className="relative backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-10 md:p-14 max-w-xl w-full shadow-2xl text-center">
        <div className="mx-auto w-fit mb-6 p-5 rounded-full bg-violet-500/10 border border-violet-400/20">
          <Lightbulb className="w-12 h-12 text-violet-300" />
        </div>

        <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-bold">Page Not Found</h2>

        <p className="mt-4 text-slate-300 leading-relaxed">
          The idea you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home size={18} />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

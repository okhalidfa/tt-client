"use client";
 
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Turn Your Vision Into Reality",
    subtitle: "Share your startup idea with a community ready to help you build it.",
  },
  {
    title: "Get Feedback From The Community",
    subtitle: "Real people, real comments, real validation for your next big thing.",
  },
  {
    title: "Validate Before You Build",
    subtitle: "Discover trending ideas and see what resonates before you invest.",
  },
];

const Banner = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 text-white">
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center px-6 py-28 flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {slides[active].title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl">
          {slides[active].subtitle}
        </p>

        <Link
          href="/ideas"
          className="mt-4 px-8 py-3 rounded-full bg-white text-violet-700 font-semibold hover:scale-105 transition-transform"
        >
          Explore Ideas
        </Link>

        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === active ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;


"use client";
// hhshs
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import IdeaCard from "@/components/IdeaCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { categories } from "@/lib/categories";

const IdeasList = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Explore Ideas - IdeaVault";
  }, []);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?${params.toString()}`,
      );
      const data = await res.json();
      setIdeas(data);
      setLoading(false);
    };

    fetchIdeas();
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-14">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Explore Ideas</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Browse startup ideas shared by the community
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search idea title..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : ideas.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-16">
          No ideas found. Try a different search or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
};

const IdeasPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <IdeasList />
    </Suspense>
  );
};

export default IdeasPage;

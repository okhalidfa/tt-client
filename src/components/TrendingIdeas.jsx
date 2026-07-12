import Link from "next/link";
import IdeaCard from "./IdeaCard";

const TrendingIdeas = async () => {
  let ideas = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/trending`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch trending ideas:", res.status);
    } else {
      ideas = await res.json();
    }
  } catch (error) {
    console.error("Error fetching trending ideas:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-5 mt-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold">Trending Ideas</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Fresh startup concepts the community is talking about right now
          </p>
        </div>

        <Link
          href="/ideas"
          className="px-5 py-2 rounded-lg border-2 border-violet-600 text-violet-600 font-medium hover:bg-violet-600 hover:text-white transition-colors"
        >
          All Ideas
        </Link>
      </div>

      {ideas.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-center py-10">
          No trending ideas yet — check back soon.
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

export default TrendingIdeas;
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditIdeaModal from "@/components/EditIdeaModal";
import DeleteIdeaAlert from "@/components/DeleteIdeaAlert";
import { Lightbulb, Tag } from "lucide-react";
 
const MyIdeasPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/mine/${user?.email}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  const ideas = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-bold mb-2">My Ideas</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Ideas you have shared with the community
      </p>

      {ideas.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-16">
          You have not submitted any ideas yet.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="flex flex-col sm:flex-row gap-5 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
            >
              {idea.imageUrl ? (
                <img
                  src={idea.imageUrl}
                  alt={idea.title}
                  className="w-full sm:w-40 h-32 object-cover rounded-xl"
                />
              ) : (
                <div className="w-full sm:w-40 h-32 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  <Lightbulb size={28} />
                </div>
              )}

              <div className="flex-1">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  <Tag size={11} className="inline mr-1" />
                  {idea.category}
                </span>
                <h2 className="text-xl font-bold mt-2">{idea.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {idea.shortDescription}
                </p>

                <div className="flex gap-3 mt-4">
                  <EditIdeaModal idea={idea} />
                  <DeleteIdeaAlert idea={idea} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;

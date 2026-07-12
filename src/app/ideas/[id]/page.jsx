import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CommentSection from "@/components/CommentSection";
import { Lightbulb, Tag, Users, Wallet, Target, Rocket } from "lucide-react";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const idea = await res.json();

  const {
    title,
    shortDescription,
    detailedDescription,
    category,
    tags,
    imageUrl,
    budget,
    targetAudience,
    problemStatement,
    proposedSolution,
    authorName,
    authorImage,
  } = idea;

  return (
    <div className="max-w-5xl mx-auto px-5 py-14">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-80 object-cover rounded-2xl" />
      ) : (
        <div className="w-full h-80 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Lightbulb size={48} />
        </div>
      )}

      <div className="mt-8">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          <Tag size={12} className="inline mr-1" />
          {category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mt-4">{title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">{shortDescription}</p>

        <div className="flex items-center gap-3 mt-5">
          <img
            src={authorImage || `https://api.dicebear.com/9.x/initials/svg?seed=${authorName}`}
            alt={authorName}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{authorName}</span>
        </div>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Users size={18} className="text-violet-600" />
            <div>
              <p className="text-xs text-slate-400">Target Audience</p>
              <p className="text-sm font-medium">{targetAudience}</p>
            </div>
          </div>

          {budget && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <Wallet size={18} className="text-violet-600" />
              <div>
                <p className="text-xs text-slate-400">Estimated Budget</p>
                <p className="text-sm font-medium">{budget}</p>
              </div>
            </div>
          )}

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <Tag size={18} className="text-violet-600" />
            <div>
              <p className="text-xs text-slate-400">Category</p>
              <p className="text-sm font-medium">{category}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">About This Idea</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {detailedDescription}
          </p>
        </div>

        <div className="mt-8 flex items-start gap-3">
          <Target size={20} className="text-violet-600 mt-1" />
          <div>
            <h3 className="font-bold">Problem Statement</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{problemStatement}</p>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3">
          <Rocket size={20} className="text-violet-600 mt-1" />
          <div>
            <h3 className="font-bold">Proposed Solution</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{proposedSolution}</p>
          </div>
        </div>

        <CommentSection ideaId={id} ideaTitle={title} />
      </div>
    </div>
  );
};

export default IdeaDetailsPage;

import Link from "next/link";
import { Lightbulb, Users, Tag } from "lucide-react";

const IdeaCard = ({ idea }) => { 
  const { _id, title, shortDescription, category, targetAudience, imageUrl } = idea;
 
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow flex flex-col">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="h-44 w-full object-cover" />
      ) : (
        <div className="h-44 w-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Lightbulb size={36} />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <span className="w-fit text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
          <Tag size={12} className="inline mr-1" />
          {category}
        </span>

        <h3 className="text-lg font-bold line-clamp-1">{title}</h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {shortDescription}
        </p>

        {targetAudience && (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Users size={12} /> {targetAudience}
          </div>
        )}

        <Link
          href={`/ideas/${_id}`}
          className="mt-auto text-center px-4 py-2 rounded-lg border border-violet-600 text-violet-600 dark:text-violet-400 font-medium hover:bg-violet-600 hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default IdeaCard;

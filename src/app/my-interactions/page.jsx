import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const MyInteractionsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/interactions/${user?.email}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  const comments = await res.json();

  return (
    <div className="max-w-4xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-bold mb-2">My Interactions</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-10">
        Ideas you have commented on
      </p>

      {comments.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-16">
          You have not interacted with any ideas yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <Link
              key={comment._id}
              href={`/ideas/${comment.ideaId}`}
              className="flex items-start gap-4 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-violet-400 transition-colors"
            >
              <span className="p-2 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300">
                <MessageSquare size={16} />
              </span>

              <div>
                <p className="font-semibold">{comment.ideaTitle}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {comment.text}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInteractionsPage;

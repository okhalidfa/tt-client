"use client";
 
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { categories } from "@/lib/categories";

const AddIdeaPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Add Idea - IdeaVault";
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const idea = Object.fromEntries(formData.entries());
    idea.tags = idea.tags
      ? idea.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];
    idea.authorEmail = user?.email;
    idea.authorName = user?.name;
    idea.authorImage = user?.image;

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(idea),
    });

    await res.json();
    setLoading(false);
    toast.success("Idea submitted successfully!");
    router.push("/my-ideas");
  };

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Share Your Idea</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Tell the community what you are building and why it matters
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Idea Title</label>
          <input
            required
            name="title"
            placeholder="A one-line name for your idea"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Short Description</label>
          <input
            required
            name="shortDescription"
            placeholder="One or two sentences summarizing the idea"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Detailed Description</label>
          <textarea
            required
            name="detailedDescription"
            rows={4}
            placeholder="Explain the idea in detail"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Category</label>
          <select
            required
            name="category"
            defaultValue=""
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Tags (optional, comma separated)</label>
          <input
            name="tags"
            placeholder="saas, mobile, marketplace"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Image URL</label>
          <input
            name="imageUrl"
            type="url"
            placeholder="https://example.com/idea-cover.jpg"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Estimated Budget (optional)</label>
          <input
            name="budget"
            placeholder="$5,000"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Target Audience</label>
          <input
            required
            name="targetAudience"
            placeholder="Who is this idea for?"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Problem Statement</label>
          <textarea
            required
            name="problemStatement"
            rows={3}
            placeholder="What problem does this solve?"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Proposed Solution</label>
          <textarea
            required
            name="proposedSolution"
            rows={3}
            placeholder="How does your idea solve it?"
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit Idea"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIdeaPage;

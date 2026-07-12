"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, X } from "lucide-react";
import { categories } from "@/lib/categories";

const EditIdeaModal = ({ idea }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.currentTarget);
    const updated = Object.fromEntries(formData.entries());
    updated.tags = updated.tags
      ? updated.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${idea._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(updated),
    });

    setSaving(false);
    setOpen(false);
    toast.success("Idea updated successfully!");
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <Pencil size={14} /> Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-5">Edit Idea</h2>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                defaultValue={idea.title}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <input
                name="shortDescription"
                defaultValue={idea.shortDescription}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <textarea
                name="detailedDescription"
                defaultValue={idea.detailedDescription}
                rows={3}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <select
                name="category"
                defaultValue={idea.category}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <input
                name="tags"
                defaultValue={idea.tags?.join(", ")}
                placeholder="tags, comma separated"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <input
                name="imageUrl"
                defaultValue={idea.imageUrl}
                placeholder="Image URL"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <input
                name="budget"
                defaultValue={idea.budget}
                placeholder="Estimated budget"
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <input
                name="targetAudience"
                defaultValue={idea.targetAudience}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <textarea
                name="problemStatement"
                defaultValue={idea.problemStatement}
                rows={2}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <textarea
                name="proposedSolution"
                defaultValue={idea.proposedSolution}
                rows={2}
                required
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
              />

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditIdeaModal;

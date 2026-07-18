"use client";
 
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const DeleteIdeaAlert = ({ idea }) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${idea._id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${tokenData?.token}` },
    });

    setDeleting(false);
    setOpen(false);
    toast.success("Idea deleted successfully");
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 px-4 py-2 rounded-lg border border-red-300 text-red-500 text-sm hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
      >
        <Trash2 size={14} /> Delete
      </button  >

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold mb-2">Delete this idea?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This will permanently remove <strong>{idea.title}</strong> and all of its
              comments. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-lg bg-red-500 text-white disabled:opacity-60 cursor-pointer"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteIdeaAlert;

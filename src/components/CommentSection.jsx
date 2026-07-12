"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, Send } from "lucide-react";

const CommentSection = ({ ideaId, ideaTitle }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const loadComments = async () => {
    setLoading(true);
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`, {
      headers: { authorization: `Bearer ${tokenData?.token}` },
    });
    const data = await res.json();
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [ideaId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({
        ideaId,
        ideaTitle,
        userEmail: user?.email,
        userName: user?.name,
        userImage: user?.image,
        text,
      }),
    });

    await res.json();
    setText("");
    toast.success("Comment added!");
    loadComments();
  };

  const handleEditSave = async (id) => {
    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({ text: editText }),
    });

    setEditingId(null);
    toast.success("Comment updated!");
    loadComments();
  };

  const handleDelete = async (id) => {
    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${tokenData?.token}` },
    });

    setConfirmId(null);
    toast.success("Comment deleted");
    loadComments();
  };

  return (
    <div className="mt-14">
      <h2 className="text-2xl font-bold mb-5">Discussion ({comments.length})</h2>

      <form onSubmit={handleAdd} className="flex gap-3 mb-8">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts on this idea..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Send size={16} /> Post
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-400">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-slate-400">No comments yet. Be the first to weigh in.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      comment.userImage ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${comment.userName}`
                    }
                    alt={comment.userName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{comment.userName}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {user?.email === comment.userEmail && (
                  <div className="flex items-center gap-3 text-slate-400">
                    <button
                      onClick={() => {
                        setEditingId(comment._id);
                        setEditText(comment.text);
                      }}
                      className="hover:text-violet-600 cursor-pointer"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setConfirmId(comment._id)}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
              </div>

              {editingId === comment._id ? (
                <div className="mt-3 flex gap-2">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500 text-sm"
                  />
                  <button
                    onClick={() => handleEditSave(comment._id)}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-sm cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-sm">{comment.text}</p>
              )}

              {confirmId === comment._id && (
                <div className="mt-3 flex items-center gap-3 text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                  <span>Delete this comment?</span>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white cursor-pointer"
                  >
                    Yes, delete
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;

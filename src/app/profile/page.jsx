"use client";
 
import { authClient } from "@/lib/auth-client";
import { useEffect, useState} from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "My Profile - IdeaVault";
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await authClient.updateUser({ name, image });

    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update profile");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="text-center mb-8">
        <img
          src={image || `https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-20 h-20 rounded-full object-cover mx-auto border border-slate-200 dark:border-slate-700"
        />
        <h1 className="text-2xl font-bold mt-4">Profile Management</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{user?.email}</p>
      </div>

      <form
        onSubmit={onSubmit   }
        className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col gap-4"
      >
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Photo URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-violet-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2.5 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors disabled:opacity-60 cursor-pointer"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;


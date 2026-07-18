"use client"; 
 
import { authClient } from "@/lib/auth-client";
import { Lightbulb, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Ideas", href: "/ideas" },
  { label: "Add Idea", href: "/add-idea" },
  { label: "My Ideas", href: "/my-ideas" },
  { label: "My Interactions", href: "/my-interactions" },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0  bg-white/80 dark:bg-slate-950/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-[1450] mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-between gap-2 font-bold text-xl">
          <span className="p-2 rounded-xl bg-violet-600 text-white">
            <Lightbulb size={18} />
          </span>
          IdeaVault
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium pl-60">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-violet-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h3 className="text-sm font-semibold">{user.name}</h3>
                <p className="text-xs text-violet-600">{user.email}</p>
              </div>

              <Link href="/profile">
                <img
                  src={
                    user.image ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                  }
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border cursor-pointer hover:opacity-80 transition"
                />
              </Link>

              <button
                onClick={handleSignOut}
                className="px-5 py-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">Login</Link>

              <Link
                href="/signup"
                className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-4 text-sm font-medium border-t border-slate-200 dark:border-slate-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <ThemeToggle />

            {user ? (
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      user.image ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-xs text-violet-600">{user.email}</p>
                  </div>
                </div>

                <Link href="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-left text-red-500 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>

                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

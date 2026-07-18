import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
 
const Footer = () => {
  return (
    <footer className="mt-24 bg-slate-950 text-slate-400 px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex items-center gap-2">
          <span className="p-2 rounded-xl bg-violet-600 text-white">
            <Lightbulb size={18} />
          </span>
          <h1 className="text-2xl font-bold text-white">IdeaVault</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-white mb-3 tracking-wide">PLATFORM</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ideas" className="hover:text-white">
                  Ideas
                </Link>
              </li>
              <li>
                <Link href="/ideas?category=Tech" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/add-idea" className="hover:text-white">
                  Add Idea
                </Link>
              </li>
              <li>
                <Link href="/my-ideas " className="hover:text-white">
                  My Ideas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-3 tracking-wide">CONTACT</h3>
            <ul className="space-y-2 text-sm">
              <li>support@ideavault.com</li>
              <li>+1 234 567 890</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-3 tracking-wide">RESOURCES</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/login" className="hover:text-white">
                  Login
                </Link   >
              </li>
              <li>
                <Link href="/signup" className="hover:text-white">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-3 tracking-wide">FOLLOW US</h3>
            <div className="flex gap-4 text-lg">
              <FaXTwitter className="cursor-pointer hover:text-white" />
              <FaLinkedinIn className="cursor-pointer hover:text-white" />
              <FaGithub className="cursor-pointer hover:text-white  " />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-sm text-center">
          © 2026 IdeaVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

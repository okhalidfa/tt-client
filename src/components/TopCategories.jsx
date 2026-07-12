import Link from "next/link";
import {
  Cpu,
  HeartPulse,
  BrainCircuit,
  GraduationCap,
  Landmark,
  Leaf,
} from "lucide-react";

const categories = [
  { name: "Tech", icon: Cpu },
  { name: "Health", icon: HeartPulse },
  { name: "AI", icon: BrainCircuit },
  { name: "Education", icon: GraduationCap },
  { name: "Finance", icon: Landmark },
  { name: "Environment", icon: Leaf },
];

const TopCategories = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-24 mb-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Explore By Category</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Jump straight into the space you care about most
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
        {categories.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            href={`/ideas?category=${name}`}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-500 hover:-translate-y-1 transition-all"
          >
            <Icon size={24} className="text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-medium">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;

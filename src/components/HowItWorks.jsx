import { PenLine, MessagesSquare, Rocket } from "lucide-react";
  
const steps = [
  {
    icon: PenLine,
    title: "Share Your Idea",
    desc: "Post your startup concept with all the details investors and users care about.",
  },
  {
    icon: MessagesSquare,
    title: "Get Community Feedback",
    desc: "Collect honest comments and discussions from fellow founders and enthusiasts.",
  },
  {
    icon: Rocket,
    title: "Refine And Grow",
    desc: "Use the feedback to sharpen your idea before you build or pitch it.",
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How IdeaVault Works</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          From spark to validated concept in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center"
          >
            <div className="mx-auto w-fit p-4 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 mb-4">
              <Icon size={26} />
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

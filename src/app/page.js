import Banner from "@/components/Banner";
import TrendingIdeas from "@/components/TrendingIdeas";
import HowItWorks from "@/components/HowItWorks";
import TopCategories from "@/components/TopCategories";

export default function Home() {
  return (
    <div>
      <Banner />
      <TrendingIdeas />
      <HowItWorks />
      <TopCategories />
    </div>
  );
}

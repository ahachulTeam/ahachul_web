import Tab from "~/components/talk/lounge/Tab";
import FilterList from "~/components/talk/lounge/FilterList";
import TalkLoungeList from "~/components/talk/lounge/List";
import FancyCard from "~/components/talk/lounge/FancyCard";

export default function TalkLounge() {
  return (
    <main>
      <Tab />
      <FancyCard />
      <FilterList />
      <TalkLoungeList />
    </main>
  );
}

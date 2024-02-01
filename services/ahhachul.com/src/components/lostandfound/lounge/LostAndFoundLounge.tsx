import Tab from "~/components/lostandfound/lounge/Tab";
import FilterList from "~/components/lostandfound/lounge/FilterList";

import 인기분실물Filter from "./인기분실물Filter";
import List from "./List";

export default function LostAndFoundLounge() {
  return (
    <main>
      <Tab />
      <FilterList />
      <인기분실물Filter />
      <List />
    </main>
  );
}

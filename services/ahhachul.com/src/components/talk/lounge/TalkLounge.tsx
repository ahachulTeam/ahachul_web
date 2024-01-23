import TalkLoungeTab from "~/components/talk/lounge/Tab";
import TalkLoungeFilterList from "~/components/talk/lounge/FilterList";
import dynamic from "next/dynamic";

const TalkLoungeList = dynamic(() => import("~/components/talk/lounge/List"), {
  ssr: false,
});

export default function TalkLounge() {
  return (
    <main>
      <TalkLoungeTab />
      <TalkLoungeFilterList />
      <TalkLoungeList />
    </main>
  );
}

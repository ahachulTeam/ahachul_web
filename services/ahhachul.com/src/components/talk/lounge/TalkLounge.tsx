import { TalkPageProps } from "~/pages/talk/[[...slug]]";

import TalkLoungeTab from "~/components/talk/lounge/Tab";
import TalkLoungeFilterList from "~/components/talk/lounge/FilterList";
import TalkLoungeList from "~/components/talk/lounge/List";

export default function TalkLounge(props: Pick<TalkPageProps, "slug">) {
  const slug = props.slug;

  console.log("slug:", slug);

  return (
    <main>
      <TalkLoungeTab />
      <TalkLoungeFilterList />
      <TalkLoungeList />
    </main>
  );
}

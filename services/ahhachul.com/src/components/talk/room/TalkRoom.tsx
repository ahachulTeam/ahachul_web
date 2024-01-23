import { TalkPageProps } from "~/pages/talk/[[...slug]]";

export default function TalkRoom(props: Pick<TalkPageProps, "slug">) {
  const slug = props.slug;

  console.log("slug:", slug);

  return <main>detailPage {JSON.stringify(slug)}</main>;
}

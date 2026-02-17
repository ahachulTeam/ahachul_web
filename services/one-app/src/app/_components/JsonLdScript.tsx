import { serializeJsonLd } from '@ahhachul/seo';

type Props = {
  payload: unknown;
  id?: string;
};

export default function JsonLdScript({ payload, id }: Props) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(payload),
      }}
    />
  );
}

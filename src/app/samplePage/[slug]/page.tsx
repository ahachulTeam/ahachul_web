"use client";

interface Props {
  params: {
    slug: string;
  };
}

export default function SampleSlugPage({ params }: Props) {
  const { slug } = params;

  return <span>{slug}</span>;
}

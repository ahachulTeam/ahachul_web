const LdJsonList = ({ richResults }: { richResults: Record<string, unknown>[] }) => {
  return (
    <>
      {richResults.map(({ id, value }: any) => (
        <script
          id={id}
          key={id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(value),
          }}
        />
      ))}
    </>
  );
};

export default LdJsonList;

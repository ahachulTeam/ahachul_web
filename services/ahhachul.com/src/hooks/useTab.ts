import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export type UseTabOptions = {
  structureType: "slug" | "query";
  queryKey?: string;
};

export const useTab = <T extends string>(
  tabList: Record<T, string>,
  options: UseTabOptions,
) => {
  const router = useRouter();
  const structureType = options.structureType;

  if (options.structureType === "query" && !options.queryKey) {
    throw new Error(
      "useTab must be used within a queryKey when structureType is 'query'",
    );
  }

  const defaultTab = Object.keys(tabList)[0] as T;
  const selectedTab =
    structureType === "slug"
      ? router.query?.[structureType]?.[0] ?? defaultTab
      : router.query[options.queryKey!] ?? defaultTab;

  const handleChangeTab = useCallback(
    (tab: string) => () => {
      if (structureType === "slug") {
        router.replace({
          pathname: router.pathname,
          query: { slug: [tab] },
        });
      } else {
        router.replace({
          pathname: router.pathname,
          query: { [options.queryKey!]: tab },
        });
      }
    },
    [],
  );

  useEffect(() => {
    const isExistTab = Object.keys(tabList).includes(selectedTab as string);

    if (!isExistTab) {
      if (structureType === "slug") {
        router.replace({
          pathname: router.pathname,
          query: { slug: [defaultTab] },
        });
      } else {
        router.replace({
          pathname: router.pathname,
          query: { [options.queryKey!]: defaultTab },
        });
      }
    }
  }, []);

  return {
    selectedTab,
    handleChangeTab,
  };
};

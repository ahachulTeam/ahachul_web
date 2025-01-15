import { useMemo } from 'react';

import { LOST_FOUND_FILTER_DEFAULT_VALUES } from 'pages/lost-found/data';
import { APP_UNIQUE_FILTER_ID_LIST } from 'widgets/filters/data/uniqueId';
import { createFilterStoreWithPersist } from 'widgets/filters/slice/filters';

export const useLostFoundFilterStore = (keyword: string) => {
  const filterProps = createFilterStoreWithPersist(
    LOST_FOUND_FILTER_DEFAULT_VALUES,
    APP_UNIQUE_FILTER_ID_LIST.LostFound,
  )();

  const boundaryKeys = useMemo(
    () => [...Object.values(filterProps.filters), keyword],
    [filterProps.filters, keyword],
  );

  return { filterProps, boundaryKeys };
};

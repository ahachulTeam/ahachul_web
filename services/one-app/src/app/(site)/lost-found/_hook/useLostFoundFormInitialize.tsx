import { useEffect } from 'react';

type Params = {
  lostFoundDetailInfo: any;
  initCallback: (
    title: string,
    initialContent: string,
    subwayLineId: number,
  ) => void;
};

const useLostFoundFormInitialize = ({
  lostFoundDetailInfo,
  initCallback,
}: Params) => {
  useEffect(() => {
    if (lostFoundDetailInfo) {
      const { title, initialContent, subwayLineId } = lostFoundDetailInfo;
      initCallback(title, initialContent, subwayLineId);
    }
  }, [lostFoundDetailInfo]);
};

export default useLostFoundFormInitialize;

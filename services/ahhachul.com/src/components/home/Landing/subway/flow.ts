import { useFlow } from 'stackflow';

export const useFlowStepOnSubwaySection = () => {
  const { push } = useFlow();
  const toSubwayMap = () => push('SubwayMap', {});
  const toSubwayTimeTable = () => push('SubwayTimeTable', {});

  return { toSubwayMap, toSubwayTimeTable };
};

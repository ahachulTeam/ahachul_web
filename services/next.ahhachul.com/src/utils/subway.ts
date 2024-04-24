import subwayLines from '../../public/subway-lines.json';
import { ISubway } from '../types/subway';

const subwayInfoList = subwayLines.reduce((acc, curr) => {
  curr?.stations?.forEach((station) => {
    if (!acc[station?.name]) {
      acc[station?.name] = [
        {
          stationId: station?.id,
          parentLineId: curr?.id,
          parentLineName: curr?.name,
        },
      ];
    } else {
      acc[station?.name] = [
        ...acc[station?.name],
        {
          stationId: station?.id,
          parentLineId: curr?.id,
          parentLineName: curr?.name,
        },
      ];
    }
  });
  return acc;
}, {} as ISubway);

export { subwayInfoList };

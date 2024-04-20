import { base } from '..';
import { IResponse } from '@/src/types';
import { IMember, MemberUpdateType } from '@/src/types/member';

const PATH = '/members';

const checkNickname = (nickname: string) =>
  base.post<IResponse<{ available: boolean }>>(`${PATH}/check-nickname`, { nickname });

const getPersonalInfo = () => base.get<IResponse<IMember>>(`${PATH}`);

const putPersonalInfo = (data: MemberUpdateType) => base.patch(`${PATH}`, data);

// TODO: api 수정되면 고도화하기
const putMyStations = (data: { stationNames: string[] }) => base.patch(`${PATH}/bookmarks/stations`, data);

export { checkNickname, getPersonalInfo, putPersonalInfo, putMyStations };

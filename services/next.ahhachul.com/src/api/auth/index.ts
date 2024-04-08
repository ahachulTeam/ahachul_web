import { IRefreshTokenParams } from '@/src/types';
import { base } from '..';

const PATH = '/auth';

const refreshToken = (data: IRefreshTokenParams) => base.post(`${PATH}/tokens`, data);

export { refreshToken };

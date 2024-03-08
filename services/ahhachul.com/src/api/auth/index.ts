import { IRefreshTokenParams } from 'types';
import { base } from '..';

const PATH = '/auth';

const refreshToken = (data: IRefreshTokenParams) => base.post(`${PATH}/tokens`, data);

export { refreshToken };

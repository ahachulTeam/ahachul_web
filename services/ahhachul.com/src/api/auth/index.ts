import { base } from 'api';
import { IRefreshTokenParams } from 'types';

const PATH = '/auth';

const refreshToken = (data: IRefreshTokenParams) => base.post(`${PATH}/tokens`, data);

export { refreshToken };

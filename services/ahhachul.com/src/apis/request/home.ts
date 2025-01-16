import axios from 'axios';

import ax from '@/apis/fetcher';
import type * as type from '@/types';

export const fetchBankList = async (): Promise<type.BankListServerModel> => {
  const res = await ax.get('/banks');
  return res.data;
};

export const fetchCountryNumberList = async (): Promise<type.CountryNumberListServerModel> => {
  const res = await ax.get('/countries');
  return res.data;
};

export const fetchVehicleList = async (): Promise<type.VehicleListServerModel> => {
  const res = await ax.get('/vehicles');
  return res.data;
};

// TODO: AWS S3 조회용 Presigned URL 요청
export const fetchS3Presigned = async (key: string): Promise<string> => {
  const { data } = await ax.get(`/presigned/${key}`);

  return data.url;
};

// TODO: AWS S3 업로드용 Presigned URL 요청
export const createS3Presigned = (key: string) => ax.post(`/presigned/${key}`);

export const fetchShippingDriver = async (
  req: type.ShippingDriverQueryModel,
): Promise<type.ShippingDriverServerModel> => {
  const { data } = await ax.get(`/drivers/${req.driverId}/shipping`);

  return data;
};

export const sendPublicS3Presigned = async (key: string, file: File): Promise<any> => {
  const res: type.PublicPresignedServerModel = await ax.post(`/public/presigned/${key}`);

  const formData = new FormData();

  for (const [key, value] of Object.entries(res.data.fields)) {
    formData.append(key, value);
  }
  formData.append('Content-type', file.type);
  formData.append('file', file);

  return await axios.post(res.data.url, formData);
};

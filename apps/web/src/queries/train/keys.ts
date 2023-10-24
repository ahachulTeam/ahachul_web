export const trainKeys = {
  all: ['train'] as const,
  metaDataList: () => [...trainKeys.all, 'metaData'] as const,
  metaData: (trainNumber: string) => [...trainKeys.metaDataList(), trainNumber] as const,
}

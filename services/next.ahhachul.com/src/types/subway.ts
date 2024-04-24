export interface IStation {
  stationId: number;
  parentLineId: number;
  parentLineName: string;
}

export interface ISubway {
  [key: string]: IStation[];
}

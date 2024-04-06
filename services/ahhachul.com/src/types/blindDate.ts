export interface IBlindDate {
  userAcceptedUsingBlindDate: boolean;
  activeView: BlindDateViewType;
}

export type BlindDateViewType = 'BLIND' | 'PARTY';

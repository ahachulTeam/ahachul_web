export interface IBlindDate {
  userAcceptedUsingBlindDate: boolean;
  activeView: BlindDateViewType;
  showNavbar: boolean;
}

export type BlindDateViewType = 'BLIND' | 'PARTY';

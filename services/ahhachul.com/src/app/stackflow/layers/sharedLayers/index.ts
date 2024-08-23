import { SharedComponent } from 'components';

export const sharedLayers = {
  Chat: SharedComponent.Chat,
  Alarm: SharedComponent.Alarm,
  MyTicket: SharedComponent.MyTicket,
  MyProfile: SharedComponent.MyProfile,
  AllServices: SharedComponent.AllServices,
  SubwayWarning: SharedComponent.SubwayWarning,
  SubwayTimeTable: SharedComponent.SubwayTimeTable,
  SubwayLineTalks: SharedComponent.SubwayLineTalks,
  StationTalks: SharedComponent.StationTalks,
} as const;

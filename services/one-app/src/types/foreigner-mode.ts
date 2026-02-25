export type ForeignerLocale = 'ko' | 'en' | 'th' | 'cn';

export type ForeignerStationGuide = {
  generatedAt: string;
  station: {
    stationId: number;
    subwayLineId: number;
    nameKo: string;
    nameLocalized: string;
    romanizedName: string;
    pronunciation: string;
    subwayLineNameKo: string;
    subwayLineNameLocalized: string;
    locale: ForeignerLocale;
  };
  templates: {
    complaintTitleTemplate: string;
    complaintBodyTemplate: string;
    lostTitleTemplate: string;
    lostBodyTemplate: string;
  };
  cultureGuide: {
    lastTrainTip: string;
    transferEtiquetteTip: string;
    safetyTip: string;
    emergencyPhrase: string;
  };
  oneClickActions?: Array<{
    actionType:
      | 'CALL_EMERGENCY_112'
      | 'OPEN_LOST_REPORT'
      | 'OPEN_COMPLAINT_REPORT'
      | 'COPY_EMERGENCY_PHRASE';
    title: string;
    description: string;
    deepLink: string;
    payloadTemplate: string | null;
  }>;
  supportedLocales: ForeignerLocale[];
};

export type ForeignerCommunityPostTranslation = {
  postId: number;
  sourceLocale: string;
  targetLocale: ForeignerLocale;
  originalTitle: string;
  originalContent: string;
  translatedTitle: string;
  translatedContent: string;
  isFallback: boolean;
  notice: string;
};

export type ForeignerStationSocialHotspots = {
  generatedAt: string;
  locale: ForeignerLocale;
  hotspots: Array<{
    stationId: number;
    subwayLineId: number;
    stationNameKo: string;
    stationNameLocalized: string;
    lineNameLocalized: string;
    romanizedName: string;
    districtLabel: string;
    summary: string;
    contentTags: string[];
    upcomingMeetupCount: number;
    reviewCount: number;
  }>;
};

export type ForeignerStationSocialOverview = {
  generatedAt: string;
  locale: ForeignerLocale;
  station: {
    stationId: number;
    subwayLineId: number;
    stationNameKo: string;
    stationNameLocalized: string;
    lineNameKo: string;
    lineNameLocalized: string;
    romanizedName: string;
    pronunciation: string;
    cultureTips: string[];
  };
  sameNationalityOnly: boolean;
  nationalityCode: string | null;
  calendar: Array<{
    date: string;
    meetupCount: number;
  }>;
  meetups: Array<{
    meetupId: number;
    title: string;
    description: string;
    meetupAt: string;
    maxParticipants: number;
    acceptedCount: number;
    hostMemberId: number;
    hostNickname: string;
    nationalityCode: string | null;
    sameNationalityOnly: boolean;
    status: string;
    mine: boolean;
    participants: Array<{
      participantId: number;
      memberId: number;
      nickname: string;
      nationalityCode: string | null;
      status: string;
      mine: boolean;
    }>;
  }>;
  reviewPosts: Array<{
    postId: number;
    title: string;
    preview: string;
    writer: string;
    createdAt: string;
  }>;
};

export type CreateForeignerStationSocialMeetupPayload = {
  stationId: number;
  subwayLineId: number;
  title: string;
  description: string;
  meetupAt: string;
  maxParticipants: number;
  nationalityCode?: string;
  sameNationalityOnly: boolean;
};

export type CreateForeignerStationSocialMeetupResult = {
  meetupId: number;
  createdAt: string;
};

export type JoinForeignerStationSocialMeetupPayload = {
  introductionMessage?: string;
  nationalityCode?: string;
};

export type JoinForeignerStationSocialMeetupResult = {
  meetupId: number;
  participantId: number;
  status: string;
};

export type ReviewForeignerStationSocialParticipantPayload = {
  approve: boolean;
};

export type ReviewForeignerStationSocialParticipantResult = {
  meetupId: number;
  participantId: number;
  status: string;
};

export type OpenForeignerStationSocialMatchPayload = {
  targetMemberId: number;
  openingMessage?: string;
};

export type OpenForeignerStationSocialMatchResult = {
  meetupId: number;
  targetMemberId: number;
  roomId: number;
  messageId: number;
};

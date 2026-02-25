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

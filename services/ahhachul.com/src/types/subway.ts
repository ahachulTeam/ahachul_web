export type SubwayLineType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '12'
  | '15'
  | '18'
  | '13'
  | '16'
  | '11'
  | '20';

export type SubwayLineKrType =
  | '1호선'
  | '2호선'
  | '3호선'
  | '4호선'
  | '5호선'
  | '6호선'
  | '7호선'
  | '8호선'
  | '9호선'
  | '경강선'
  | '경춘선'
  | '서해선'
  | '신분당선'
  | '공항철도'
  | '수인분당선'
  | '경의중앙선'
  | '우이신설경전철';

export interface UserStation {
  label: string;
  stationId: number;
  stationName: string;
  subwayLineInfoList: {
    subwayLineId: SubwayLineType;
    subwayLineName: string;
  }[];
}

export type UserStationList = UserStation[];

export type UserFavoriteStations = {
  stationInfoList: UserStationList;
};

export type WithSubwayLineId = {
  subwayLineId: number | SubwayLineType;
};

export type WithSubwayStationId = {
  stationId: number;
};

export interface WithSubwayTrainId {
  trainNo: number;
}

export interface APITrainInfoParams extends WithSubwayLineId, WithSubwayStationId {}

/**
 * 열차의 현재 도착 상태를 나타내는 타입
 */
export enum CurrentTrainArrivalType {
  ENTER = 'ENTER',
  ARRIVE = 'ARRIVE',
  DEPARTURE = 'DEPARTURE',
  BEFORE_STATION_DEPARTURE = 'BEFORE_STATION_DEPARTURE',
  BEFORE_STATION_ARRIVE = 'BEFORE_STATION_ARRIVE',
  BEFORE_STATION_ENTER = 'BEFORE_STATION_ENTER',
  RUNNING = 'RUNNING',
}

export enum UpDownType {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface ITrain {
  trainNum: number;
  upDownType: UpDownType;
  nextStationDirection: string;
  destinationStationDirection: string;
  currentArrivalTime: number;
  currentTrainArrivalCode: CurrentTrainArrivalType;
}

export type CongestionColorType = 'SMOOTH' | 'MODERATE' | 'CONGESTED' | 'VERY_CONGESTED';

export interface Congestion {
  sectionNo: number;
  congestionColor: CongestionColorType;
}

export interface StationServerModel {
  id: number;
  name: string;
}

export interface StationClientModel {
  stationId: number;
  parentLineNames: string;
  parentLineId: number;
}

export type Stations = { [key: string]: StationClientModel[] };

export interface SubwayLine {
  id: number;
  name: string;
  phoneNumber: string;
  stations: StationServerModel[];
}

export interface SubwayLineServerModel {
  subwayLines: SubwayLine[];
}

export enum StationTimeWeekType {
  WEEKDAY = 'WEEKDAY',
  SATURDAY = 'SATURDAY',
  HOLIDAY = 'HOLIDAY',
}

export interface StationTimeSummary {
  upDownType: UpDownType;
  firstDepartureTime: string | null;
  lastDepartureTime: string | null;
  firstDestinationStationName: string | null;
  lastDestinationStationName: string | null;
}

export enum StationSummaryAvailabilityStatus {
  AVAILABLE = 'AVAILABLE',
  PARTIAL = 'PARTIAL',
  EMPTY = 'EMPTY',
}

export enum StationSummaryDataSource {
  CACHE = 'CACHE',
  API = 'API',
  FALLBACK_EMPTY = 'FALLBACK_EMPTY',
}

export interface StationTimeSummarySourceDetail {
  upDownType: UpDownType;
  dataSource: StationSummaryDataSource;
  stationTimesCount: number;
  fallbackReasonCode: string | null;
}

export interface StationTimeSummaryMeta {
  generatedAt: string;
  availabilityStatus: StationSummaryAvailabilityStatus;
  coveragePercent: number;
  guidanceMessage: string;
  sourceDetails: StationTimeSummarySourceDetail[];
}

export interface StationTimeSummaryResponse {
  stationTimeWeekType: StationTimeWeekType;
  summaries: StationTimeSummary[];
  meta?: StationTimeSummaryMeta;
}

export enum LastTrainRiskLevel {
  SAFE = 'SAFE',
  WARN = 'WARN',
  RISK = 'RISK',
}

export interface LastTrainRiskResponse {
  stationTimeWeekType: StationTimeWeekType;
  upDownType: UpDownType;
  walkingMinutes: number;
  nowAt: string;
  lastDepartureTime: string | null;
  minutesToLastTrain: number;
  isLastTrainRisk: boolean;
  riskLevel: LastTrainRiskLevel;
  message: string;
}

export enum QuickExitConfidenceLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface QuickExitRecommendation {
  carNo: string;
  exitNo: string;
  directionHint: string;
  walkingBenefitMinutes: number;
  confidenceLevel: QuickExitConfidenceLevel;
}

export interface QuickExitResponse {
  stationId: number;
  subwayLineId: number;
  upDownType: UpDownType;
  recommendations: QuickExitRecommendation[];
}

export enum NearbyPlaceConfidenceLevel {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface NearbyPlace {
  name: string;
  category: string;
  walkingMinutes: number;
  openNow: boolean;
  supportsEnglishMenu: boolean;
  confidenceLevel: NearbyPlaceConfidenceLevel;
}

export interface NearbyPlacesResponse {
  stationId: number;
  subwayLineId: number;
  exitNo?: string | null;
  places: NearbyPlace[];
}

export enum StationWeatherDataSource {
  API = 'API',
  CACHE = 'CACHE',
  STALE_CACHE = 'STALE_CACHE',
  FALLBACK = 'FALLBACK',
}

export interface StationWeatherBriefResponse {
  stationId: number;
  stationName: string;
  generatedAt: string;
  dataSource: StationWeatherDataSource;
  isStale: boolean;
  summaryText: string;
  cautionText: string;
  friendlyText: string;
  temperatureC: number | null;
  apparentTemperatureC: number | null;
  precipitationMm: number | null;
  windSpeedMps: number | null;
  weatherCode: number | null;
  weatherLabel: string;
}

export enum RouteSearchStrategy {
  BALANCED = 'BALANCED',
  MIN_TRANSFER = 'MIN_TRANSFER',
  MIN_STOP = 'MIN_STOP',
}

export enum RouteWalkingPreference {
  FAST = 'FAST',
  LESS_STAIRS = 'LESS_STAIRS',
}

export type RouteQualityConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type RouteQualityBadge =
  | 'BEST_RECOMMENDED'
  | 'TRANSFER_HEAVY'
  | 'WALKING_HEAVY'
  | 'LAST_TRAIN_RISK'
  | 'DELAY_RISK'
  | 'DATA_LIMITED';

export interface SubwayRouteNode {
  stationId: number;
  stationName: string;
  order: number;
  isTransfer: boolean;
}

export interface SubwayRouteEdge {
  fromStationId: number;
  toStationId: number;
  subwayLineId: number;
  subwayLineName: string;
}

export interface SubwayRouteSummary {
  totalStops: number;
  transferCount: number;
  estimatedMinutes: number;
}

export interface SubwayRoute {
  rank: number;
  nodes: SubwayRouteNode[];
  edges: SubwayRouteEdge[];
  summary: SubwayRouteSummary;
  quality?: {
    totalScore: number;
    transferRiskScore: number;
    walkingScore: number;
    lastTrainSafetyScore: number;
    delayResilienceScore: number;
    delayProbabilityPercent: number;
    confidenceLevel: RouteQualityConfidenceLevel;
    badges: RouteQualityBadge[];
    reasons: string[];
  };
}

export interface SubwayRouteSearchResponse {
  modelVersion?: string;
  generatedAt: string;
  sourceStationId: number;
  destinationStationId: number;
  strategy: RouteSearchStrategy;
  walkingPreference?: RouteWalkingPreference;
  stationTimeWeekType?: StationTimeWeekType;
  routes: SubwayRoute[];
}

export interface StationTimesFullWeek {
  stationTimeWeekType: StationTimeWeekType;
  upDownTimetables: {
    upDownType: UpDownType;
    stationTimes: {
      arrivalTime: string;
      departureTime: string;
      arrivalStationName: string;
      departureStationName: string;
      trainType: string;
    }[];
  }[];
}

export interface StationTimesFullResponse {
  generatedAt: string;
  stationId: number;
  subwayLineId: number;
  weeks: StationTimesFullWeek[];
}

export type DelayProofGrade = 'A' | 'B' | 'C';
export type DelayProofConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface DelayProofOfficialIncident {
  eventId: string;
  occurredAt: string;
  resolvedAt: string | null;
  severity: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string | null;
}

export interface DelayProofCommunitySignal {
  postId: number;
  createdAt: string;
  writer: string;
  matchedKeyword: string;
  reportedDelayMin: number | null;
  snippet: string;
}

export interface DelayProofEvidenceSummary {
  official: {
    matched: boolean;
    eventCount: number;
    dataSource: string;
    incidents: DelayProofOfficialIncident[];
  };
  community: {
    signalCount: number;
    distinctAuthors: number;
    medianReportedDelayMin: number | null;
    confidenceLevel: DelayProofConfidenceLevel;
    signals: DelayProofCommunitySignal[];
  };
  realtime: {
    isStale: boolean;
    freshnessSec: number;
    confidenceLevel: DelayProofConfidenceLevel;
    generatedAt: string;
  };
}

export interface DelayProofPayload {
  proofId: string;
  issuedAt: string;
  expiresAt: string;
  grade: DelayProofGrade;
  confidenceLevel: DelayProofConfidenceLevel;
  evidenceSummary: DelayProofEvidenceSummary;
  text: string;
  shareUrl: string;
  signature: string;
}

export interface DelayProofCreateRequest {
  stationId: number;
  subwayLineId: number;
  upDownType?: UpDownType;
  expectedArrivalAt?: string;
  customMessage?: string;
}

export interface DelayCenterOverviewQuery {
  stationId: number;
  subwayLineId: number;
  upDownType?: UpDownType;
  windowMinutes?: number;
  incidentLimit?: number;
  signalLimit?: number;
}

export type CommunityReliabilityBadgeLevel = 'NONE' | 'ELEVATED' | 'SPIKE';

export interface CommunityDelaySignalsQuery {
  subwayLineId: number;
  stationId?: number;
  windowMinutes?: number;
  limit?: number;
}

export interface CommunityDelaySignalsPayload {
  generatedAt: string;
  subwayLineId: number;
  stationId: number | null;
  windowMinutes: number;
  timeSlotMinutes: number;
  signalCount: number;
  distinctAuthors: number;
  medianReportedDelayMin: number | null;
  confidenceLevel: DelayProofConfidenceLevel;
  reliabilityBadgeLevel: CommunityReliabilityBadgeLevel;
  sameTimeSlotSignalCount: number;
  sameTimeSlotDistinctAuthors: number;
  signals: DelayProofCommunitySignal[];
}

export interface DelayCenterOverviewPayload {
  generatedAt: string;
  stationId: number;
  subwayLineId: number;
  upDownType: UpDownType | null;
  realtime: {
    generatedAt: string;
    dataSource: string;
    isStale: boolean;
    freshnessSec: number;
    confidenceLevel: DelayProofConfidenceLevel;
    etaSec: number | null;
    etaMinDisplay: number | null;
    destinationStationDirection: string | null;
    nextStationDirection: string | null;
  };
  official: {
    dataSource: string;
    eventCount: number;
    activeEventCount: number;
    incidents: DelayProofOfficialIncident[];
  };
  community: {
    signalCount: number;
    distinctAuthors: number;
    medianReportedDelayMin: number | null;
    confidenceLevel: DelayProofConfidenceLevel;
    signals: DelayProofCommunitySignal[];
  };
  recommendation: {
    gradePreview: DelayProofGrade;
    confidenceLevel: DelayProofConfidenceLevel;
    estimatedDelayMin: number;
    recommendedExpectedArrivalAt: string;
    recommendedMessage: string;
  };
}

export interface DailyVoteOption {
  optionCode: string;
  label: string;
  emoji: string;
  voteCount: number;
  voteRatePercent: number;
}

export interface DailyVotePollCard {
  pollId: number;
  question: string;
  pollContext: 'COMMUTE' | 'SCHOOL';
  pollSlot: 'MORNING' | 'EVENING';
  stationId: number;
  stationName: string;
  subwayLineId: number;
  subwayLineName: string;
  isPrimary: boolean;
  voted: boolean;
  selectedOptionCode: string | null;
  totalVoteCount: number;
  options: DailyVoteOption[];
}

export interface DailyVoteStationDiaryCard {
  pollId: number;
  question: string;
  stationId: number;
  stationName: string;
  visible: boolean;
  commentCount: number;
}

export interface DailyVoteTodayResponse {
  generatedAt: string;
  profileHint: string;
  primaryPoll: DailyVotePollCard | null;
  secondaryPoll: DailyVotePollCard | null;
  stationDiary: DailyVoteStationDiaryCard | null;
}

export interface DailyVoteCommentItem {
  commentId: number;
  writer: string;
  content: string;
  imageUrls: string[];
  likeCount: number;
  likedByMe: boolean;
  mine: boolean;
  createdAt: string;
}

export interface DailyVoteCommentsResponse {
  pollId: number;
  sort: 'latest' | 'popular';
  comments: DailyVoteCommentItem[];
}

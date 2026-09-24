export interface JudgeInfo {
  name: string;
  role: string;
  experience: string;
  avatarUrl: string;
  introVideoUrl?: string;
}

export interface PreviousWinner {
  name: string;
  rankTitle: string;
  avatarUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export interface RewardTier {
  rank: number;
  title: string;
  amount: number;
  icon?: string;
}

export interface CriteriaItem {
  title: string;
  weight: string;
  description: string;
}

export interface TabContent {
  about: {
    shortText: string;
    fullText: string;
  };
  judgingParameters: {
    criteria: CriteriaItem[];
  };
  rulesAndEligibility: {
    rules: string[];
  };
}

export interface CompetitionDates {
  registerBefore: string;
  submissionStart: string;
  submissionEnd: string;
  resultDate: string;
}

export interface UserState {
  isRegistered: boolean;
  hasSubmitted: boolean;
  registrationDetails?: {
    _id: string;
    amountPaid: number;
    paymentStatus: string;
    transactionId: string;
    registeredAt: string;
  } | null;
  submissionDetails?: {
    _id: string;
    title: string;
    videoUrl: string;
    description: string;
    submittedAt: string;
    status: string;
  } | null;
}

export interface Competition {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  prizePool: number;
  entryFee: number;
  maxSpots: number;
  bookedSpots: number;
  remainingSpots: number;
  dates: CompetitionDates;
  judge: JudgeInfo;
  previousWinners: PreviousWinner[];
  tabContent: TabContent;
  rewards: RewardTier[];
  disclaimerText: string;
  referralInfo: {
    linkPrefix: string;
    rewardPerSignup: number;
  };
  status: 'UPCOMING' | 'REGISTRATION_OPEN' | 'SUBMISSION_OPEN' | 'JUDGING' | 'RESULTS_DECLARED' | 'REGISTRATION_CLOSED' | 'CANCELLED';
  computedStatus?: string;
  serverTime?: string;
  userState?: UserState;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  referralCode?: string;
  walletBalance?: number;
}

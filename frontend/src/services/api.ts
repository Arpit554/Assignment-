import { Competition, UserProfile } from '../types';

// Fallback to local machine IP or localhost
const BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Get competition details with user context
  async getCompetition(competitionId: string = 'latest', userId?: string): Promise<Competition> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (userId) {
        headers['x-user-id'] = userId;
      }

      const response = await fetch(`${BASE_URL}/competitions/${competitionId}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      return json.data;
    } catch (error) {
      console.warn('API fetch failed, returning fallback mock data:', error);
      return getFallbackCompetitionData(userId);
    }
  },

  // Register for competition
  async register(competitionId: string, userId: string, paymentMethod: string = 'Razorpay UPI') {
    const response = await fetch(`${BASE_URL}/competitions/${competitionId}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, paymentMethod }),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Registration failed');
    }
    return json;
  },

  // Submit competition entry
  async submitEntry(competitionId: string, payload: { userId: string; title: string; videoUrl: string; description?: string; danceStyle?: string }) {
    const response = await fetch(`${BASE_URL}/competitions/${competitionId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || 'Submission failed');
    }
    return json;
  },

  // Fetch demo users
  async getUsers(): Promise<UserProfile[]> {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const json = await response.json();
      return json.data;
    } catch {
      return [
        {
          _id: 'user_priya',
          name: 'Priya Sharma',
          email: 'priya.sharma@example.com',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          referralCode: 'priya123',
          walletBalance: 150,
        },
        {
          _id: 'user_rahul',
          name: 'Rahul Verma',
          email: 'rahul.verma@example.com',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          referralCode: 'rahul99',
          walletBalance: 200,
        },
        {
          _id: 'user_ananya',
          name: 'Ananya Iyer',
          email: 'ananya.iyer@example.com',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          referralCode: 'ananya01',
          walletBalance: 80,
        },
      ];
    }
  },

  // Simulate competition states for testing
  async simulateState(competitionId: string, state: { status?: string; bookedSpots?: number }) {
    const response = await fetch(`${BASE_URL}/competitions/${competitionId}/simulate-state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
    return response.json();
  },

  // Reseed database
  async reseed() {
    const response = await fetch(`${BASE_URL}/competitions/seed/reset`, {
      method: 'POST',
    });
    return response.json();
  }
};

// Fallback data matching the exact mockup
function getFallbackCompetitionData(userId?: string): Competition {
  const isRegistered = userId === 'user_priya' || !userId; // Default demo is registered
  const hasSubmitted = userId === 'user_ananya';

  return {
    _id: 'feedants_dance_01',
    title: 'Feedants Classical Dance',
    slug: 'feedants-classical-dance',
    category: 'Dance',
    tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
    prizePool: 1500,
    entryFee: 99,
    maxSpots: 20,
    bookedSpots: 1,
    remainingSpots: 19,
    dates: {
      registerBefore: '2026-08-10T23:50:00.000Z',
      submissionStart: '2026-08-06T04:00:00.000Z',
      submissionEnd: '2026-08-30T23:55:00.000Z',
      resultDate: '2026-09-01T23:50:00.000Z',
    },
    judge: {
      name: 'Manju Dubey',
      role: 'Professional Kathak Dancer',
      experience: '12+ Years of Experience',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    previousWinners: [
      {
        name: 'Riya Shah',
        rankTitle: '1st Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      },
      {
        name: 'Aarav Mehta',
        rankTitle: '1st Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      },
      {
        name: 'Neha Verma',
        rankTitle: '2nd Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
      },
      {
        name: 'Ishita Chopra',
        rankTitle: '3rd Winner',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        thumbnailUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      },
    ],
    tabContent: {
      about: {
        shortText: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
        fullText: 'Feedants Classical Dance is India’s premier virtual platform celebrating timeless dance forms including Bharatnatyam, Kathak, Odissi, Kuchipudi, and Mohiniyattam. Showcase your mastery of Mudras, Bhava, and Thalam before esteemed classical gurus. Top performers earn cash rewards, verifiable digital certificates, and promotional spotlight on Feedants community channels.',
      },
      judgingParameters: {
        criteria: [
          { title: 'Expression (Bhava & Abhinaya)', weight: '30%', description: 'Facial expressions, eye movement, and emotional storytelling.' },
          { title: 'Rhythm & Footwork (Thalam / Laya)', weight: '30%', description: 'Precision of beats, speed control, and footwork synchronization.' },
          { title: 'Posture & Mudras (Angashuddhi)', weight: '25%', description: 'Clarity of hand gestures, stage presence, and posture balance.' },
          { title: 'Costume & Presentation', weight: '15%', description: 'Traditional authenticity, clarity of video, and elegance.' },
        ],
      },
      rulesAndEligibility: {
        rules: [
          'Open to all age groups worldwide.',
          'Performance duration should be between 2 to 5 minutes.',
          'Solo classical dance styles only (Kathak, Bharatnatyam, Odissi, Kuchipudi, etc.).',
          'Raw unedited performance videos preferred. Clear background audio required.',
          'Only contributions from paid participants will be considered for final judging.',
          'Strict zero tolerance for plagiarized or copyrighted third-party clips.',
        ],
      },
    },
    rewards: [
      { rank: 1, title: '1st Winner', amount: 550, icon: 'gold_trophy' },
      { rank: 2, title: '2nd Winner', amount: 300, icon: 'silver_medal' },
      { rank: 3, title: '3rd Winner', amount: 240, icon: 'bronze_medal' },
      { rank: 4, title: '4th Winner', amount: 200, icon: 'star' },
      { rank: 5, title: '5th Winner', amount: 130, icon: 'star' },
      { rank: 6, title: '6th Winner', amount: 80, icon: 'star' },
    ],
    disclaimerText: 'Only contributions from paid participants will be considered for judging.',
    referralInfo: {
      linkPrefix: 'https://feedants.com/r/referral123',
      rewardPerSignup: 10,
    },
    status: 'REGISTRATION_OPEN',
    computedStatus: 'REGISTRATION_OPEN',
    serverTime: new Date().toISOString(),
    userState: {
      isRegistered,
      hasSubmitted,
      registrationDetails: isRegistered ? {
        _id: 'reg_123',
        amountPaid: 99,
        paymentStatus: 'SUCCESS',
        transactionId: 'PAY_FED928374',
        registeredAt: new Date().toISOString(),
      } : null,
      submissionDetails: hasSubmitted ? {
        _id: 'sub_123',
        title: 'Kathak Tarana - Raag Darbari',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        description: 'Teental 16 beats performance.',
        submittedAt: new Date().toISOString(),
        status: 'SUBMITTED',
      } : null,
    },
  };
}

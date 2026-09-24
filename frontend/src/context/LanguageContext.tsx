import React, { createContext, useContext, useState } from 'react';

type Language = 'ENG' | 'HIN';

interface Translations {
  goBack: string;
  prizePool: string;
  entryFee: string;
  onlySpotsLeft: (count: number) => string;
  booked: (booked: number, total: number) => string;
  registered: string;
  registerNow: string;
  judge: string;
  introVideo: string;
  registrationClosesIn: string;
  hurryUp: string;
  importantDates: string;
  registerBefore: string;
  submissionStarts: string;
  submissionEnds: string;
  resultDate: string;
  previousWinners: string;
  aboutCompetition: string;
  judgingParameters: string;
  rulesEligibility: string;
  viewMore: string;
  viewLess: string;
  rewardsAllPositions: string;
  disclaimer: string;
  howReceivePrize: string;
  watchVideo: string;
  refundPolicy: string;
  securePayments: string;
  referEarn: string;
  copyLink: string;
  copied: string;
  referNow: string;
  earnPerSignup: (amount: number) => string;
  hearFromUsers: string;
  seeWhatSay: string;
  adHere: string;
  uploadSubmission: string;
  submissionReceived: string;
  spotsFull: string;
  registrationClosed: string;
  submitting: string;
  registering: string;
  home: string;
  explore: string;
  competitions: string;
  profile: string;
}

const translations: Record<Language, Translations> = {
  ENG: {
    goBack: 'Go back',
    prizePool: 'Prize Pool',
    entryFee: 'Entry Fee',
    onlySpotsLeft: (count) => `Only ${count} spots left`,
    booked: (booked, total) => `${booked} / ${total} Booked`,
    registered: 'Registered',
    registerNow: 'Register Now',
    judge: 'Judge',
    introVideo: 'Intro Video',
    registrationClosesIn: 'Registration closes in',
    hurryUp: 'Hurry up!',
    importantDates: 'Important Dates',
    registerBefore: 'Register Before',
    submissionStarts: 'Submission Starts',
    submissionEnds: 'Submission Ends',
    resultDate: 'Result Date',
    previousWinners: 'Previous Winners',
    aboutCompetition: 'About Competition',
    judgingParameters: 'Judging Parameters',
    rulesEligibility: 'Rules & Eligibility',
    viewMore: 'View more',
    viewLess: 'View less',
    rewardsAllPositions: 'Rewards (All Positions)',
    disclaimer: 'Disclaimer: Only contributions from paid participants will be considered for judging.',
    howReceivePrize: 'How will you receive prize money?',
    watchVideo: 'Watch video to know more',
    refundPolicy: 'Refund policy',
    securePayments: 'Secure payments powered by',
    referEarn: 'Refer & Earn more discount',
    copyLink: 'Copy Link',
    copied: 'Copied!',
    referNow: 'Refer Now',
    earnPerSignup: (amt) => `You earn ₹${amt} for every signup`,
    hearFromUsers: 'Hear From Our Users',
    seeWhatSay: 'See what participants say about Feedants',
    adHere: 'Ad Here',
    uploadSubmission: 'Upload Submission',
    submissionReceived: 'Submission Received',
    spotsFull: 'Spots Full (Waitlist)',
    registrationClosed: 'Registration Closed',
    submitting: 'Submitting...',
    registering: 'Processing...',
    home: 'Home',
    explore: 'Explore',
    competitions: 'Competitions',
    profile: 'Profile',
  },
  HIN: {
    goBack: 'वापस जाएं',
    prizePool: 'पुरस्कार राशि',
    entryFee: 'प्रवेश शुल्क',
    onlySpotsLeft: (count) => `केवल ${count} स्थान शेष`,
    booked: (booked, total) => `${booked} / ${total} बुक किए गए`,
    registered: 'पंजीकृत',
    registerNow: 'अभी रजिस्टर करें',
    judge: 'निर्णायक',
    introVideo: 'परिचय वीडियो',
    registrationClosesIn: 'पंजीकरण समाप्त होने में',
    hurryUp: 'जल्दी करें!',
    importantDates: 'महत्वपूर्ण तिथियां',
    registerBefore: 'अंतिम पंजीकरण',
    submissionStarts: 'प्रस्तुति प्रारंभ',
    submissionEnds: 'प्रस्तुति समाप्ति',
    resultDate: 'परिणाम तिथि',
    previousWinners: 'पिछले विजेता',
    aboutCompetition: 'प्रतियोगिता के बारे में',
    judgingParameters: 'निर्णय के मापदंड',
    rulesEligibility: 'नियम व पात्रता',
    viewMore: 'और देखें',
    viewLess: 'कम देखें',
    rewardsAllPositions: 'पुरस्कार (सभी स्थान)',
    disclaimer: 'अस्वीकरण: केवल भुगतान करने वाले प्रतिभागियों की प्रविष्टियों पर निर्णय लिया जाएगा।',
    howReceivePrize: 'पुरस्कार राशि कैसे मिलेगी?',
    watchVideo: 'विस्तार से जानने के लिए वीडियो देखें',
    refundPolicy: 'रिफंड नीति',
    securePayments: 'सुरक्षित भुगतान माध्यम',
    referEarn: 'रेफर करें और छूट पाएं',
    copyLink: 'लिंक कॉपी करें',
    copied: 'कॉपी हो गया!',
    referNow: 'अभी रेफर करें',
    earnPerSignup: (amt) => `प्रत्येक साइनअप पर ₹${amt} कमाएं`,
    hearFromUsers: 'हमारे उपयोगकर्ताओं की राय',
    seeWhatSay: 'देखें प्रतिभागी फीडेंट्स के बारे में क्या कहते हैं',
    adHere: 'विज्ञापन स्थान',
    uploadSubmission: 'प्रविष्टि अपलोड करें',
    submissionReceived: 'प्रविष्टि प्राप्त हुई',
    spotsFull: 'स्थान भर गए हैं',
    registrationClosed: 'पंजीकरण बंद',
    submitting: 'अपलोड हो रहा है...',
    registering: 'प्रोसेसिंग...',
    home: 'होम',
    explore: 'एक्सप्लोर',
    competitions: 'प्रतियोगिताएं',
    profile: 'प्रोफ़ाइल',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ENG',
  setLanguage: () => {},
  t: translations.ENG,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ENG');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

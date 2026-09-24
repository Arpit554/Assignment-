const Competition = require('../models/Competition');
const User = require('../models/User');
const Registration = require('../models/Registration');
const Submission = require('../models/Submission');

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding Feedants initial data...');

    // Clear existing collections
    await User.deleteMany({});
    await Competition.deleteMany({});
    await Registration.deleteMany({});
    await Submission.deleteMany({});

    // 1. Create Demo Users
    const registeredUser = await User.create({
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 9811223344',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      referralCode: 'priya123',
      walletBalance: 150,
    });

    const unregisteredUser = await User.create({
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 9877665544',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      referralCode: 'rahul99',
      walletBalance: 200,
    });

    const submittedUser = await User.create({
      name: 'Ananya Iyer',
      email: 'ananya.iyer@example.com',
      phone: '+91 9765432100',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      referralCode: 'ananya01',
      walletBalance: 80,
    });

    // Set dynamic dates: registration closing in 30 hours (1 day 6 hours) so the countdown is active
    const now = Date.now();
    const regDate = new Date(now + (1000 * 60 * 60 * 30.5)); // ~1d 6h 30m
    const subStartDate = new Date(now - (1000 * 60 * 60 * 24)); // started yesterday
    const subEndDate = new Date(now + (1000 * 60 * 60 * 24 * 7)); // ends in 7 days
    const resDate = new Date(now + (1000 * 60 * 60 * 24 * 9)); // results in 9 days

    const competition = await Competition.create({
      title: 'Feedants Classical Dance',
      slug: 'feedants-classical-dance',
      category: 'Dance',
      tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
      prizePool: 1500,
      entryFee: 99,
      maxSpots: 20,
      bookedSpots: 1,
      dates: {
        registerBefore: regDate,
        submissionStart: subStartDate,
        submissionEnd: subEndDate,
        resultDate: resDate,
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
          fullText: 'Feedants Classical Dance is India’s premier virtual stage celebrating heritage arts including Bharatnatyam, Kathak, Odissi, Kuchipudi, and Mohiniyattam. Showcase your mastery of Mudras, Bhava, and Thalam before acclaimed classical icons. Top performers earn cash rewards, verifiable digital certificates, and spotlight features across Feedants community channels.',
        },
        judgingParameters: {
          criteria: [
            { title: 'Expression (Bhava & Abhinaya)', weight: '30%', description: 'Facial expressions, eye movement, and emotional connection.' },
            { title: 'Rhythm & Footwork (Thalam / Laya)', weight: '30%', description: 'Precision of beats, speed variation, and footwork synchronization.' },
            { title: 'Posture & Mudras (Angashuddhi)', weight: '25%', description: 'Clarity of hand gestures, stage presence, and posture.' },
            { title: 'Costume & Presentation', weight: '15%', description: 'Traditional authenticity, clarity of recording, and elegance.' },
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
    });

    // 3. Register Priya Sharma (1 spot booked)
    await Registration.create({
      user: registeredUser._id,
      competition: competition._id,
      amountPaid: 99,
      paymentStatus: 'SUCCESS',
      transactionId: 'PAY_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      paymentMethod: 'Razorpay UPI',
    });

    // 4. Create submission for Ananya Iyer
    await Registration.create({
      user: submittedUser._id,
      competition: competition._id,
      amountPaid: 99,
      paymentStatus: 'SUCCESS',
      transactionId: 'PAY_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    });

    await Submission.create({
      user: submittedUser._id,
      competition: competition._id,
      title: 'Kathak Tarana - Raag Darbari',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      description: 'Performed in Teental, 16 beats. Focused on Chakkar and Bhav.',
      danceStyle: 'Kathak',
      status: 'SUBMITTED',
    });

    // Update bookedSpots to 2
    competition.bookedSpots = 2;
    await competition.save();

    console.log('✅ Database seeded successfully!');
    return {
      competitionId: competition._id,
      users: {
        registered: registeredUser,
        unregistered: unregisteredUser,
        submitted: submittedUser,
      },
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

module.exports = seedDatabase;

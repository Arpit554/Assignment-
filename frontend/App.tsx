import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  Text,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { api } from './src/services/api';
import { Competition } from './src/types';
import { COLORS } from './src/theme/colors';

// Components
import { Header } from './src/components/Header';
import { TitleAndBadges } from './src/components/TitleAndBadges';
import { MetricsCard } from './src/components/MetricsCard';
import { JudgeCard } from './src/components/JudgeCard';
import { CountdownBanner } from './src/components/CountdownBanner';
import { ImportantDatesGrid } from './src/components/ImportantDatesGrid';
import { PreviousWinnersCarousel } from './src/components/PreviousWinnersCarousel';
import { TabsSection } from './src/components/TabsSection';
import { RewardsList } from './src/components/RewardsList';
import { TrustBadges } from './src/components/TrustBadges';
import { ReferralSection } from './src/components/ReferralSection';
import { TestimonialBanner } from './src/components/TestimonialBanner';
import { AdBanner } from './src/components/AdBanner';
import { BottomCTA } from './src/components/BottomCTA';
import { BottomNavbar } from './src/components/BottomNavbar';
import { Toast } from './src/components/Toast';

// Modals
import { VideoPlayerModal } from './src/components/Modals/VideoPlayerModal';
import { SubmissionModal } from './src/components/Modals/SubmissionModal';
import { PaymentModal } from './src/components/Modals/PaymentModal';
import { TestimonialsModal } from './src/components/Modals/TestimonialsModal';
import { RefundPolicyModal } from './src/components/Modals/RefundPolicyModal';
import { UserSwitcherModal } from './src/components/Modals/UserSwitcherModal';

const { width } = Dimensions.get('window');

function MainScreen() {
  const { currentUser } = useAuth();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Modal States
  const [videoModal, setVideoModal] = useState<{ visible: boolean; url: string; title: string }>({
    visible: false,
    url: '',
    title: '',
  });
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [refundPolicyVisible, setRefundPolicyVisible] = useState(false);
  const [userSwitcherVisible, setUserSwitcherVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  // Fetch Competition Data
  const loadCompetition = useCallback(async () => {
    try {
      const data = await api.getCompetition('latest', currentUser?._id);
      setCompetition(data);
    } catch (error) {
      console.error('Failed to load competition data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadCompetition();
  }, [loadCompetition]);

  const onRefresh = () => {
    setRefreshing(true);
    loadCompetition();
  };

  // Open Video Player
  const handlePlayVideo = (url: string, title: string) => {
    setVideoModal({
      visible: true,
      url,
      title,
    });
  };

  // Bottom CTA Click Handler
  const handleCTAPress = () => {
    if (!competition) return;

    const isRegistered = competition.userState?.isRegistered;
    const hasSubmitted = competition.userState?.hasSubmitted;
    const computedStatus = competition.computedStatus || competition.status;

    if (computedStatus === 'RESULTS_DECLARED') {
      showToast('Viewing Competition Leaderboard & Results!');
      return;
    }

    if (hasSubmitted) {
      // User has submitted -> Open edit submission modal
      setSubmissionModalVisible(true);
    } else if (isRegistered) {
      // User is registered -> Open submit modal
      setSubmissionModalVisible(true);
    } else {
      // User is unregistered -> Open Razorpay checkout modal
      setPaymentModalVisible(true);
    }
  };

  // Confirm Razorpay Payment
  const handleConfirmPayment = async (paymentMethod: string) => {
    if (!competition || !currentUser) return;
    try {
      await api.register(competition._id, currentUser._id, paymentMethod);
      showToast('🎉 Registration Successful! Spot Confirmed.');
      await loadCompetition();
    } catch (err: any) {
      showToast(err.message || 'Registration failed.');
      throw err;
    }
  };

  // Submit Entry
  const handleSubmitEntry = async (formData: { title: string; videoUrl: string; description: string; danceStyle: string }) => {
    if (!competition || !currentUser) return;
    try {
      await api.submitEntry(competition._id, {
        userId: currentUser._id,
        ...formData,
      });
      showToast('🎉 Submission Received! Good luck!');
      await loadCompetition();
    } catch (err: any) {
      showToast(err.message || 'Submission failed.');
      throw err;
    }
  };

  // Demo Simulation Actions
  const handleSimulateState = async (status?: string, bookedSpots?: number) => {
    if (!competition) return;
    try {
      await api.simulateState(competition._id, { status, bookedSpots });
      showToast(`State updated: ${status || ''} Spots: ${bookedSpots ?? ''}`);
      await loadCompetition();
    } catch (err: any) {
      showToast(err.message || 'State change failed.');
    }
  };

  const handleReseed = async () => {
    try {
      await api.reseed();
      showToast('Database reset to initial mockup data!');
      await loadCompetition();
    } catch (err: any) {
      showToast(err.message || 'Reseed failed.');
    }
  };

  if (loading && !competition) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Competition Details...</Text>
      </View>
    );
  }

  if (!competition) return null;

  const isRegistered = Boolean(competition.userState?.isRegistered);
  const hasSubmitted = Boolean(competition.userState?.hasSubmitted);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <Toast message={toastMessage} visible={toastVisible} />

      {/* Main App Container */}
      <View style={styles.appContainer}>
        {/* Header */}
        <Header
          onBackPress={() => showToast('Navigating back...')}
          onOpenUserSwitcher={() => setUserSwitcherVisible(true)}
        />

        {/* Scrollable Competition Body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        >
          {/* Title & Tag Badges */}
          <TitleAndBadges
            title={competition.title}
            tags={competition.tags}
            isRegistered={isRegistered}
          />

          {/* Key Metrics Row */}
          <MetricsCard
            prizePool={competition.prizePool}
            entryFee={competition.entryFee}
            bookedSpots={competition.bookedSpots}
            maxSpots={competition.maxSpots}
          />

          {/* Judge Card */}
          <JudgeCard
            judge={competition.judge}
            onPlayVideo={handlePlayVideo}
          />

          {/* Urgency Countdown Banner */}
          <CountdownBanner
            targetDate={competition.dates.registerBefore}
            isRegistrationClosed={competition.computedStatus === 'REGISTRATION_CLOSED'}
          />

          {/* Important Dates 2x2 Grid */}
          <ImportantDatesGrid dates={competition.dates} />

          {/* Previous Winners Carousel */}
          <PreviousWinnersCarousel
            winners={competition.previousWinners}
            onPlayVideo={handlePlayVideo}
          />

          {/* About / Judging / Rules Tabs */}
          <TabsSection tabContent={competition.tabContent} />

          {/* Rewards Breakdown */}
          <RewardsList rewards={competition.rewards} />

          {/* Trust Badges & FAQ */}
          <TrustBadges
            onHowPrizePress={() =>
              handlePlayVideo(
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                'How will you receive prize money?'
              )
            }
            onRefundPolicyPress={() => setRefundPolicyVisible(true)}
          />

          {/* Referral & Earn Section */}
          <ReferralSection
            referralLink={
              currentUser?.referralCode
                ? `${competition.referralInfo.linkPrefix}${currentUser.referralCode}`
                : 'https://feedants.com/r/referral123'
            }
            rewardAmount={competition.referralInfo.rewardPerSignup}
            onShowToast={showToast}
          />

          {/* Testimonial Banner */}
          <TestimonialBanner onPress={() => setTestimonialsVisible(true)} />

          {/* Ad Slot */}
          <AdBanner />
        </ScrollView>

        {/* Sticky Bottom Action CTA */}
        <BottomCTA
          isRegistered={isRegistered}
          hasSubmitted={hasSubmitted}
          entryFee={competition.entryFee}
          remainingSpots={competition.remainingSpots}
          computedStatus={competition.computedStatus}
          onPress={handleCTAPress}
        />

        {/* Bottom Tab Navigation */}
        <BottomNavbar
          activeTab="Competitions"
          onTabPress={(tab) => showToast(`Selected tab: ${tab}`)}
          onAddPress={() => setSubmissionModalVisible(true)}
        />
      </View>

      {/* Modals */}
      <VideoPlayerModal
        visible={videoModal.visible}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={() => setVideoModal({ visible: false, url: '', title: '' })}
      />

      <PaymentModal
        visible={paymentModalVisible}
        amount={competition.entryFee}
        competitionTitle={competition.title}
        onConfirmPayment={handleConfirmPayment}
        onClose={() => setPaymentModalVisible(false)}
      />

      <SubmissionModal
        visible={submissionModalVisible}
        competitionTitle={competition.title}
        initialValues={competition.userState?.submissionDetails}
        onSubmit={handleSubmitEntry}
        onClose={() => setSubmissionModalVisible(false)}
      />

      <TestimonialsModal
        visible={testimonialsVisible}
        onClose={() => setTestimonialsVisible(false)}
      />

      <RefundPolicyModal
        visible={refundPolicyVisible}
        onClose={() => setRefundPolicyVisible(false)}
      />

      <UserSwitcherModal
        visible={userSwitcherVisible}
        competitionId={competition._id}
        onSimulateState={handleSimulateState}
        onReseed={handleReseed}
        onClose={() => setUserSwitcherVisible(false)}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <MainScreen />
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    maxWidth: Platform.OS === 'web' ? 480 : '100%',
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

interface BottomCTAProps {
  isRegistered: boolean;
  hasSubmitted: boolean;
  entryFee: number;
  remainingSpots: number;
  computedStatus?: string;
  isLoading?: boolean;
  onPress: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({
  isRegistered,
  hasSubmitted,
  entryFee,
  remainingSpots,
  computedStatus,
  isLoading = false,
  onPress,
}) => {
  const { t } = useLanguage();

  // Determine button state and label
  const isFull = remainingSpots <= 0;
  const isClosed = computedStatus === 'REGISTRATION_CLOSED';
  const isResultsDeclared = computedStatus === 'RESULTS_DECLARED';

  let primaryLabel = t.uploadSubmission;
  let subLabel = t.registered;
  let buttonStyle = styles.registeredCTA;
  let isDisabled = false;

  if (isResultsDeclared) {
    primaryLabel = 'View Results & Leaderboard';
    subLabel = 'Winners Announced';
    buttonStyle = styles.resultsCTA;
  } else if (hasSubmitted) {
    primaryLabel = t.submissionReceived;
    subLabel = 'Tap to View or Edit Submission';
    buttonStyle = styles.submittedCTA;
  } else if (isRegistered) {
    // Exact match with screenshot mockup
    primaryLabel = t.uploadSubmission;
    subLabel = t.registered;
    buttonStyle = styles.registeredCTA;
  } else if (isFull) {
    primaryLabel = t.spotsFull;
    subLabel = 'All 20 spots taken';
    buttonStyle = styles.disabledCTA;
  } else if (isClosed) {
    primaryLabel = t.registrationClosed;
    subLabel = 'Deadline passed';
    buttonStyle = styles.disabledCTA;
    isDisabled = true;
  } else {
    // Unregistered state
    primaryLabel = `${t.registerNow} • ₹${entryFee}`;
    subLabel = 'Instant Spot Confirmation';
    buttonStyle = styles.registerCTA;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle, isDisabled && styles.disabledButton]}
        onPress={onPress}
        disabled={isDisabled || isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.textContainer}>
            <Text style={styles.primaryText}>{primaryLabel}</Text>
            {subLabel ? (
              <Text style={styles.subText}>{subLabel}</Text>
            ) : null}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  registeredCTA: {
    backgroundColor: COLORS.primary,
  },
  registerCTA: {
    backgroundColor: '#0F766E',
  },
  submittedCTA: {
    backgroundColor: '#047857',
  },
  resultsCTA: {
    backgroundColor: '#D97706',
  },
  disabledCTA: {
    backgroundColor: '#94A3B8',
  },
  disabledButton: {
    opacity: 0.6,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subText: {
    color: '#E6F4F3',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
    opacity: 0.9,
  },
});

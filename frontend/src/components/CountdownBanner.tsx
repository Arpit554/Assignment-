import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { useCountdown } from '../hooks/useCountdown';
import { useLanguage } from '../context/LanguageContext';

interface CountdownBannerProps {
  targetDate: string;
  isRegistrationClosed?: boolean;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({
  targetDate,
  isRegistrationClosed = false,
}) => {
  const { t } = useLanguage();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isRegistrationClosed || isExpired) {
    return (
      <View style={[styles.container, styles.closedContainer]}>
        <Text style={styles.closedIcon}>🔒</Text>
        <Text style={styles.closedText}>{t.registrationClosed}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Left Icon & Label */}
      <View style={styles.leftGroup}>
        <Text style={styles.hourglassIcon}>⌛</Text>
        <Text style={styles.labelText}>{t.registrationClosesIn}</Text>
      </View>

      {/* Center Countdown Display */}
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>
          {days}d : {hours}h : {minutes}m : {seconds}s
        </Text>
      </View>

      {/* Right Hurry Up Badge */}
      <View style={styles.hurryUpGroup}>
        <Text style={styles.stopwatchIcon}>⏱</Text>
        <Text style={styles.hurryUpText}>{t.hurryUp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDF8F7',
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B2E2DF',
  },
  closedContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    justifyContent: 'center',
  },
  closedIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  closedText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourglassIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  countdownContainer: {
    paddingHorizontal: 6,
  },
  countdownText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    fontVariant: ['tabular-nums'],
  },
  hurryUpGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopwatchIcon: {
    fontSize: 13,
    marginRight: 3,
  },
  hurryUpText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
});

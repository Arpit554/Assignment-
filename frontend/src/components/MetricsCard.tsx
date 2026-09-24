import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

interface MetricsCardProps {
  prizePool: number;
  entryFee: number;
  bookedSpots: number;
  maxSpots: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  prizePool,
  entryFee,
  bookedSpots,
  maxSpots,
}) => {
  const { t } = useLanguage();
  const spotsLeft = Math.max(0, maxSpots - bookedSpots);
  const progressRatio = Math.min(1, Math.max(0, bookedSpots / maxSpots));

  return (
    <View style={styles.container}>
      {/* Prize Pool Column */}
      <View style={styles.metricColumn}>
        <Text style={styles.label}>{t.prizePool}</Text>
        <Text style={styles.prizeValue}>₹ {prizePool.toLocaleString('en-IN')}</Text>
      </View>

      {/* Entry Fee Column */}
      <View style={styles.metricColumn}>
        <Text style={styles.label}>{t.entryFee}</Text>
        <Text style={styles.feeValue}>₹ {entryFee}</Text>
      </View>

      {/* Spots Left Progress Column */}
      <View style={styles.spotsColumn}>
        <View style={styles.spotsHeader}>
          <Text style={styles.spotsIcon}>👥</Text>
          <Text style={styles.spotsLeftText}>{t.onlySpotsLeft(spotsLeft)}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.max(5, progressRatio * 100)}%` },
            ]}
          />
        </View>

        <Text style={styles.bookedText}>{t.booked(bookedSpots, maxSpots)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  metricColumn: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 4,
  },
  prizeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  feeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  spotsColumn: {
    width: 140,
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  spotsIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  spotsLeftText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  bookedText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
});

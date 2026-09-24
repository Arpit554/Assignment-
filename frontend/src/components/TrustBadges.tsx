import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

interface TrustBadgesProps {
  onHowPrizePress: () => void;
  onRefundPolicyPress: () => void;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  onHowPrizePress,
  onRefundPolicyPress,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      {/* Disclaimer Banner */}
      <View style={styles.disclaimerBanner}>
        <Text style={styles.infoIcon}>ⓘ</Text>
        <Text style={styles.disclaimerText}>{t.disclaimer}</Text>
      </View>

      {/* Two Trust & FAQ Action Cards */}
      <View style={styles.cardsRow}>
        {/* Left Card: Prize Money Video */}
        <TouchableOpacity
          style={styles.trustCard}
          onPress={onHowPrizePress}
          activeOpacity={0.8}
        >
          <View style={styles.playIconContainer}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{t.howReceivePrize}</Text>
            <Text style={styles.cardSubtitle}>{t.watchVideo}</Text>
          </View>
        </TouchableOpacity>

        {/* Right Card: Policies & Razorpay */}
        <View style={[styles.trustCard, styles.policyCard]}>
          <TouchableOpacity
            style={styles.policyRow}
            onPress={onRefundPolicyPress}
            activeOpacity={0.7}
          >
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.policyText}>{t.refundPolicy}</Text>
          </TouchableOpacity>

          <View style={styles.policyRow}>
            <Text style={styles.shieldIcon}>🔒</Text>
            <Text style={styles.policyText}>
              {t.securePayments}{' '}
              <Text style={styles.razorpayBrand}>Razorpay</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  disclaimerBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EDF8F7',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B2E2DF',
  },
  infoIcon: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 6,
    lineHeight: 18,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#0F766E',
    fontWeight: '600',
    flex: 1,
    lineHeight: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trustCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  playIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F4F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  playIcon: {
    fontSize: 11,
    color: COLORS.primary,
    marginLeft: 2,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
    lineHeight: 14,
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    lineHeight: 12,
  },
  policyCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 6,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  policyText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
  razorpayBrand: {
    fontWeight: '800',
    color: '#0C2340',
    fontStyle: 'italic',
  },
});

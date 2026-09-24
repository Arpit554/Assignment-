import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Share, Platform } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

interface ReferralSectionProps {
  referralLink: string;
  rewardAmount: number;
  onShowToast: (msg: string) => void;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({
  referralLink,
  rewardAmount,
  onShowToast,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (Platform.OS === 'web' && navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
    }
    setCopied(true);
    onShowToast(t.copied);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReferNow = async () => {
    try {
      if (Platform.OS === 'web') {
        handleCopyLink();
        return;
      }
      await Share.share({
        message: `Join me on Feedants Classical Dance Competition and win cash prizes! Sign up here: ${referralLink}`,
        url: referralLink,
      });
    } catch {
      handleCopyLink();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.leftHeader}>
            <View style={styles.megaphoneCircle}>
              <Text style={styles.megaphoneIcon}>📢</Text>
            </View>
            <Text style={styles.titleText}>{t.referEarn}</Text>
          </View>

          {/* Right Action Button */}
          <TouchableOpacity
            style={styles.referNowBtn}
            onPress={handleReferNow}
            activeOpacity={0.8}
          >
            <Text style={styles.referNowText}>{t.referNow}</Text>
          </TouchableOpacity>
        </View>

        {/* Link & Copy Row */}
        <View style={styles.linkRow}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.linkInput}
              value={referralLink}
              editable={false}
              selectTextOnFocus
            />
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={handleCopyLink}
              activeOpacity={0.7}
            >
              <Text style={styles.copyBtnText}>
                {copied ? t.copied : t.copyLink}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.rewardSubtext}>
            {t.earnPerSignup(rewardAmount)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#EDF8F7',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#B2E2DF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  megaphoneCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#CCEDE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  megaphoneIcon: {
    fontSize: 14,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
  },
  referNowBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  referNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  linkRow: {
    flexDirection: 'column',
    gap: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B2E2DF',
    overflow: 'hidden',
    alignItems: 'center',
  },
  linkInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 12,
    color: '#475569',
  },
  copyBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
  },
  copyBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  rewardSubtext: {
    fontSize: 11,
    color: '#0F766E',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
});

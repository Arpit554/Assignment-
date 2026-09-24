import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { RewardTier } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RewardsListProps {
  rewards: RewardTier[];
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return '🏆';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '⭐';
  }
};

export const RewardsList: React.FC<RewardsListProps> = ({ rewards }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{t.rewardsAllPositions}</Text>

      <View style={styles.listCard}>
        {rewards.map((reward, index) => {
          const isLast = index === rewards.length - 1;
          const isTopThree = reward.rank <= 3;

          return (
            <View
              key={index}
              style={[
                styles.rewardRow,
                !isLast && styles.rowBorder,
                isTopThree && styles.topThreeRow,
              ]}
            >
              <View style={styles.leftInfo}>
                <Text style={styles.rankIcon}>{getRankIcon(reward.rank)}</Text>
                <Text
                  style={[
                    styles.rankTitle,
                    isTopThree && styles.topRankTitle,
                  ]}
                >
                  {reward.title}
                </Text>
              </View>

              <Text
                style={[
                  styles.rewardAmount,
                  reward.rank === 1 && styles.firstPrizeAmount,
                ]}
              >
                ₹ {reward.amount}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  topThreeRow: {
    backgroundColor: '#FAFCFC',
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  rankTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  topRankTitle: {
    fontWeight: '700',
    color: '#0F172A',
  },
  rewardAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  firstPrizeAmount: {
    fontSize: 15,
    fontWeight: '800',
  },
});

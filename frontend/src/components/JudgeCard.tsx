import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { JudgeInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface JudgeCardProps {
  judge: JudgeInfo;
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const JudgeCard: React.FC<JudgeCardProps> = ({ judge, onPlayVideo }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Image
          source={{ uri: judge.avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.judgeLabel}>{t.judge}</Text>
          <Text style={styles.judgeName}>{judge.name}</Text>
          <Text style={styles.roleText}>{judge.role}</Text>
          <Text style={styles.experienceText}>{judge.experience}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.videoAction}
        onPress={() => onPlayVideo(judge.introVideoUrl || '', `${judge.name} - Intro Video`)}
        activeOpacity={0.8}
      >
        <View style={styles.playButtonCircle}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
        <Text style={styles.videoText}>{t.introVideo}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E6F4F3',
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  judgeLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 1,
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  roleText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  experienceText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  videoAction: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  playButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E6F4F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  playIcon: {
    fontSize: 15,
    color: COLORS.primary,
    marginLeft: 3,
  },
  videoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});

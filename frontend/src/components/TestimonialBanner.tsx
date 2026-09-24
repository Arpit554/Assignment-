import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

interface TestimonialBannerProps {
  onPress: () => void;
}

export const TestimonialBanner: React.FC<TestimonialBannerProps> = ({ onPress }) => {
  const { t } = useLanguage();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>💬</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t.hearFromUsers}</Text>
          <Text style={styles.subtitle}>{t.seeWhatSay}</Text>
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconText: {
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 20,
    color: '#94A3B8',
    fontWeight: '600',
    marginLeft: 8,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

interface TitleAndBadgesProps {
  title: string;
  tags: string[];
  isRegistered?: boolean;
}

export const TitleAndBadges: React.FC<TitleAndBadgesProps> = ({
  title,
  tags,
  isRegistered = false,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.registeredText}>{t.registered}</Text>
          </View>
        )}
      </View>

      <View style={styles.tagRow}>
        {tags.map((tag, index) => {
          const isCertificateTag = tag.toLowerCase().includes('certificate');
          return (
            <View
              key={index}
              style={[
                styles.tag,
                isCertificateTag && styles.certificateTag,
              ]}
            >
              {isCertificateTag && <Text style={styles.trophyIcon}>🏆 </Text>}
              <Text
                style={[
                  styles.tagText,
                  isCertificateTag && styles.certificateTagText,
                ]}
              >
                {tag}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1,
    marginRight: 12,
    letterSpacing: -0.3,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4F3',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#B2E2DF',
  },
  checkIcon: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
    marginRight: 4,
  },
  registeredText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  certificateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  trophyIcon: {
    fontSize: 12,
  },
  certificateTagText: {
    color: '#16A34A',
    fontWeight: '700',
  },
});

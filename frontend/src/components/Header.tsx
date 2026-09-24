import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onBackPress?: () => void;
  onOpenUserSwitcher?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBackPress, onOpenUserSwitcher }) => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      {/* Top mock status bar items for screen realism */}
      <View style={styles.statusBarMock}>
        <Text style={styles.statusBarTime}>9:41</Text>
        <View style={styles.statusBarIcons}>
          <Text style={styles.statusBarIconText}>📶 🔋</Text>
        </View>
      </View>

      {/* Main navigation row */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>{t.goBack}</Text>
        </TouchableOpacity>

        <View style={styles.rightActions}>
          {/* User Profile Badge (Clickable for demo switching) */}
          {currentUser && (
            <TouchableOpacity
              style={styles.userBadge}
              onPress={onOpenUserSwitcher}
              activeOpacity={0.8}
            >
              <Text style={styles.userBadgeDot}>●</Text>
              <Text style={styles.userBadgeText} numberOfLines={1}>
                {currentUser.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          )}

          {/* Language Switcher Pill */}
          <View style={styles.languagePillContainer}>
            <TouchableOpacity
              style={[
                styles.languageOption,
                language === 'ENG' && styles.languageOptionActive,
              ]}
              onPress={() => setLanguage('ENG')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.languageText,
                  language === 'ENG' && styles.languageTextActive,
                ]}
              >
                ENG
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.languageOption,
                language === 'HIN' && styles.languageOptionActive,
              ]}
              onPress={() => setLanguage('HIN')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.languageText,
                  language === 'HIN' && styles.languageTextActive,
                ]}
              >
                हिंदी
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statusBarMock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  statusBarTime: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBarIconText: {
    fontSize: 12,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 10,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userBadgeDot: {
    color: '#10B981',
    fontSize: 10,
    marginRight: 4,
  },
  userBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  languagePillContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  languageOption: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  languageOptionActive: {
    backgroundColor: COLORS.primary,
  },
  languageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  languageTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS } from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface BottomNavbarProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
  onAddPress?: () => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({
  activeTab = 'Competitions',
  onTabPress,
  onAddPress,
}) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      {/* 1. Home */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('Home')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, activeTab === 'Home' && styles.activeIcon]}>🏠</Text>
        <Text style={[styles.navLabel, activeTab === 'Home' && styles.activeLabel]}>
          {t.home}
        </Text>
      </TouchableOpacity>

      {/* 2. Explore */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('Explore')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, activeTab === 'Explore' && styles.activeIcon]}>🔍</Text>
        <Text style={[styles.navLabel, activeTab === 'Explore' && styles.activeLabel]}>
          {t.explore}
        </Text>
      </TouchableOpacity>

      {/* 3. Center Create (+) Button */}
      <TouchableOpacity
        style={styles.centerAddButton}
        onPress={onAddPress}
        activeOpacity={0.85}
      >
        <View style={styles.addCircle}>
          <Text style={styles.addPlus}>+</Text>
        </View>
      </TouchableOpacity>

      {/* 4. Competitions (Active) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('Competitions')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, styles.activeIcon]}>🏆</Text>
        <Text style={[styles.navLabel, styles.activeLabel]}>
          {t.competitions}
        </Text>
      </TouchableOpacity>

      {/* 5. Profile */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => onTabPress?.('Profile')}
        activeOpacity={0.7}
      >
        {currentUser?.avatarUrl ? (
          <Image
            source={{ uri: currentUser.avatarUrl }}
            style={styles.profileAvatar}
          />
        ) : (
          <Text style={styles.navIcon}>👤</Text>
        )}
        <Text style={[styles.navLabel, activeTab === 'Profile' && styles.activeLabel]}>
          {t.profile}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  navIcon: {
    fontSize: 18,
    color: '#94A3B8',
    marginBottom: 2,
  },
  activeIcon: {
    color: COLORS.primary,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  centerAddButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  addCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  addPlus: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginTop: -2,
  },
  profileAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
});

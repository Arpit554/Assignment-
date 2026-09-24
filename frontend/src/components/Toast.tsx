import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme/colors';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.toastCard}>
        <Text style={styles.icon}>✓</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 9999,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  icon: {
    color: '#10B981',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

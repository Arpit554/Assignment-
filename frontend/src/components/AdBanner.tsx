import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export const AdBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.adBox}>
        <Text style={styles.adIcon}>📢</Text>
        <Text style={styles.adText}>{t.adHere}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 10,
  },
  adBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    paddingVertical: 10,
  },
  adIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  adText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
});

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { COLORS } from '../theme/colors';
import { TabContent } from '../types';
import { useLanguage } from '../context/LanguageContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface TabsSectionProps {
  tabContent: TabContent;
}

type TabType = 'about' | 'judging' | 'rules';

export const TabsSection: React.FC<TabsSectionProps> = ({ tabContent }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: 'about', label: t.aboutCompetition },
    { key: 'judging', label: t.judgingParameters },
    { key: 'rules', label: t.rulesEligibility },
  ];

  return (
    <View style={styles.container}>
      {/* Tabs Header */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => {
                setActiveTab(tab.key);
                setIsExpanded(false);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content Body */}
      <View style={styles.contentBody}>
        {/* 1. About Tab */}
        {activeTab === 'about' && (
          <View>
            <Text style={styles.aboutText}>
              {tabContent.about.shortText}
            </Text>
            {isExpanded && (
              <Text style={[styles.aboutText, styles.expandedText]}>
                {tabContent.about.fullText}
              </Text>
            )}
            <TouchableOpacity
              style={styles.viewMoreButton}
              onPress={toggleExpand}
              activeOpacity={0.7}
            >
              <Text style={styles.viewMoreText}>
                {isExpanded ? t.viewLess : t.viewMore} {isExpanded ? '⌃' : '∨'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 2. Judging Parameters Tab */}
        {activeTab === 'judging' && (
          <View style={styles.criteriaList}>
            {tabContent.judgingParameters.criteria.map((item, idx) => (
              <View key={idx} style={styles.criteriaCard}>
                <View style={styles.criteriaHeader}>
                  <Text style={styles.criteriaTitle}>{item.title}</Text>
                  <View style={styles.weightBadge}>
                    <Text style={styles.weightText}>{item.weight}</Text>
                  </View>
                </View>
                <Text style={styles.criteriaDesc}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 3. Rules & Eligibility Tab */}
        {activeTab === 'rules' && (
          <View style={styles.rulesList}>
            {tabContent.rulesAndEligibility.rules.map((rule, idx) => (
              <View key={idx} style={styles.ruleItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingHorizontal: 8,
  },
  tabButton: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    position: 'relative',
    alignItems: 'center',
  },
  tabButtonActive: {},
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 12,
    right: 12,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  contentBody: {
    padding: 16,
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
    fontWeight: '400',
  },
  expandedText: {
    marginTop: 10,
  },
  viewMoreButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 6,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  criteriaList: {
    gap: 10,
  },
  criteriaCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  criteriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  criteriaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  weightBadge: {
    backgroundColor: '#E6F4F3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weightText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  criteriaDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  rulesList: {
    gap: 8,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 8,
    lineHeight: 18,
  },
  ruleText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    flex: 1,
  },
});

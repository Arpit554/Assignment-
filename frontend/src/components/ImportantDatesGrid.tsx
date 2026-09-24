import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { CompetitionDates } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ImportantDatesGridProps {
  dates: CompetitionDates;
}

// Format date helper
const formatDisplayDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { dateStr: '10 Aug 26', timeStr: '11:50 PM' };
    }
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return {
      dateStr: `${day} ${month} ${year}`,
      timeStr: `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`,
    };
  } catch {
    return { dateStr: '10 Aug 26', timeStr: '11:50 PM' };
  }
};

export const ImportantDatesGrid: React.FC<ImportantDatesGridProps> = ({ dates }) => {
  const { t } = useLanguage();

  const regBefore = formatDisplayDate(dates.registerBefore);
  const subStart = formatDisplayDate(dates.submissionStart);
  const subEnd = formatDisplayDate(dates.submissionEnd);
  const resultDate = formatDisplayDate(dates.resultDate);

  const dateItems = [
    {
      title: t.registerBefore,
      date: regBefore.dateStr,
      time: regBefore.timeStr,
      icon: '📅',
    },
    {
      title: t.submissionStarts,
      date: subStart.dateStr,
      time: subStart.timeStr,
      icon: '✈️',
    },
    {
      title: t.submissionEnds,
      date: subEnd.dateStr,
      time: subEnd.timeStr,
      icon: '📤',
    },
    {
      title: t.resultDate,
      date: resultDate.dateStr,
      time: resultDate.timeStr,
      icon: '🏆',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{t.importantDates}</Text>

      <View style={styles.gridCard}>
        {dateItems.map((item, index) => {
          const isRight = index % 2 === 1;
          const isBottom = index >= 2;

          return (
            <View
              key={index}
              style={[
                styles.gridCell,
                !isRight && styles.cellRightBorder,
                !isBottom && styles.cellBottomBorder,
              ]}
            >
              <View style={styles.iconWrapper}>
                <Text style={styles.iconText}>{item.icon}</Text>
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
                <Text style={styles.itemTime}>{item.time}</Text>
              </View>
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
    marginTop: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  gridCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  gridCell: {
    width: '50%',
    flexDirection: 'row',
    padding: 14,
    alignItems: 'flex-start',
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  cellBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconWrapper: {
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
  textWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 1,
  },
  itemTime: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0F172A',
  },
});

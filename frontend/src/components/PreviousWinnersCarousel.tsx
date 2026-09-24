import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { PreviousWinner } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PreviousWinnersCarouselProps {
  winners: PreviousWinner[];
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const PreviousWinnersCarousel: React.FC<PreviousWinnersCarouselProps> = ({
  winners,
  onPlayVideo,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{t.previousWinners}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {winners.map((winner, index) => (
          <TouchableOpacity
            key={index}
            style={styles.winnerCard}
            onPress={() => onPlayVideo(winner.videoUrl || '', `${winner.name} - ${winner.rankTitle}`)}
            activeOpacity={0.85}
          >
            {/* Thumbnail Image Container */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: winner.avatarUrl || winner.thumbnailUrl }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              {/* Overlay Play Icon */}
              <View style={styles.playOverlay}>
                <View style={styles.playCircle}>
                  <Text style={styles.playIcon}>▶</Text>
                </View>
              </View>
            </View>

            {/* Winner Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.winnerName} numberOfLines={1}>
                {winner.name}
              </Text>
              <Text style={styles.rankTitle} numberOfLines={1}>
                {winner.rankTitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 16,
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  winnerCard: {
    width: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 90,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  playCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 9,
    marginLeft: 2,
  },
  detailsContainer: {
    padding: 8,
  },
  winnerName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  rankTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

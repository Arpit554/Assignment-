import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from '../../theme/colors';

interface VideoPlayerModalProps {
  visible: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  visible,
  videoUrl,
  title,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {title || 'Video Player'}
            </Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Video Container */}
          <View style={styles.videoContainer}>
            {Platform.OS === 'web' ? (
              // Embedded HTML5 video tag for web browser preview
              <video
                src={videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
                controls
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                  backgroundColor: '#000000',
                  outline: 'none',
                }}
              />
            ) : (
              <View style={styles.mobileFallback}>
                <Text style={styles.videoIcon}>🎬</Text>
                <Text style={styles.videoFallbackText}>Playing: {title}</Text>
                <Text style={styles.videoUrlText} numberOfLines={2}>{videoUrl}</Text>
              </View>
            )}
          </View>

          {/* Footer note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Feedants Official Video Stream • High Definition
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: Math.min(width - 32, 500),
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    height: 260,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileFallback: {
    alignItems: 'center',
    padding: 20,
  },
  videoIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  videoFallbackText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  videoUrlText: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },
  footerText: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
  },
});

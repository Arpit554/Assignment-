import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { COLORS } from '../../theme/colors';

interface TestimonialsModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const TESTIMONIALS = [
  {
    name: 'Kavita Menon',
    location: 'Bengaluru',
    role: 'Bharatnatyam Practitioner',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    comment: 'Participating in the Feedants Classical Dance contest was a fantastic experience. The feedback from Guru Manju Dubey helped me refine my abhinaya so much!',
  },
  {
    name: 'Rohan Deshmukh',
    location: 'Pune',
    role: 'Kathak Dancer',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    comment: 'Instant prize transfer directly to my bank after results were announced. The platform is transparent and seamless.',
  },
  {
    name: 'Sunita Sharma',
    location: 'Delhi NCR',
    role: 'Dance Academy Mentor',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    comment: 'Five of my students participated. The certificate provided by Feedants is verifiable and added great value to their dance portfolios.',
  },
];

export const TestimonialsModal: React.FC<TestimonialsModalProps> = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Hear From Our Users</Text>
              <Text style={styles.subtitle}>Verified participant reviews</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Testimonial List */}
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {TESTIMONIALS.map((item, idx) => (
              <View key={idx} style={styles.testimonialCard}>
                <View style={styles.userRow}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userRole}>{item.role} • {item.location}</Text>
                  </View>
                  <View style={styles.starsRow}>
                    <Text style={styles.starsText}>★★★★★</Text>
                  </View>
                </View>
                <Text style={styles.commentText}>“{item.comment}”</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.okBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.okText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: Math.min(width - 32, 480),
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FAFCFC',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: 'bold',
  },
  body: {
    padding: 16,
  },
  testimonialCard: {
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  userRole: {
    fontSize: 11,
    color: '#64748B',
  },
  starsRow: {
    marginLeft: 6,
  },
  starsText: {
    color: '#F59E0B',
    fontSize: 12,
  },
  commentText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footer: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  okBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  okText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});

import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';

interface RefundPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Refund & Cancellation Policy</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>1. Registration Cancellation</Text>
            <Text style={styles.paragraph}>
              Participants may request a 100% full refund within 24 hours of registration provided the submission window has not closed.
            </Text>

            <Text style={styles.heading}>2. Competition Postponement or Cancellation</Text>
            <Text style={styles.paragraph}>
              In the rare event of competition cancellation by Feedants, 100% of the entry fee will be refunded automatically to the original payment source within 3–5 business days.
            </Text>

            <Text style={styles.heading}>3. Dispute Resolution & Razorpay Security</Text>
            <Text style={styles.paragraph}>
              All transactions are securely processed via Razorpay. For payment disputes or queries, contact support@feedants.com with your Transaction ID.
            </Text>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.okBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.okText}>I Understand</Text>
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
    width: Math.min(width - 32, 450),
    maxHeight: '80%',
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
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
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
  heading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 10,
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

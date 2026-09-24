import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

interface PaymentModalProps {
  visible: boolean;
  amount: number;
  competitionTitle: string;
  onConfirmPayment: (paymentMethod: string) => Promise<void>;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const PAYMENT_METHODS = [
  { id: 'upi_gpay', name: 'Google Pay UPI', icon: '⚡' },
  { id: 'upi_phonepe', name: 'PhonePe UPI', icon: '🟣' },
  { id: 'upi_paytm', name: 'Paytm UPI', icon: '🔵' },
  { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
];

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  amount,
  competitionTitle,
  onConfirmPayment,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState('upi_gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePay = async () => {
    try {
      setIsProcessing(true);
      setErrorMessage('');
      const methodObj = PAYMENT_METHODS.find((m) => m.id === selectedMethod);
      await onConfirmPayment(methodObj?.name || 'Razorpay UPI');
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

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
          {/* Razorpay Brand Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.brandTitle}>Razorpay Checkout</Text>
              <Text style={styles.subBrand}>Official Payment Gateway</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Amount Summary */}
          <View style={styles.summaryBox}>
            <View>
              <Text style={styles.compLabel} numberOfLines={1}>
                {competitionTitle}
              </Text>
              <Text style={styles.feeLabel}>Registration Entry Fee</Text>
            </View>
            <Text style={styles.amountValue}>₹ {amount}</Text>
          </View>

          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
            </View>
          ) : null}

          {/* Payment Methods List */}
          <View style={styles.methodsContainer}>
            <Text style={styles.methodsHeader}>Select Payment Mode</Text>
            {PAYMENT_METHODS.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[styles.methodItem, isSelected && styles.methodItemSelected]}
                  onPress={() => setSelectedMethod(method.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.methodLeft}>
                    <Text style={styles.methodIcon}>{method.icon}</Text>
                    <Text style={[styles.methodName, isSelected && styles.methodNameSelected]}>
                      {method.name}
                    </Text>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Trust Badge */}
          <View style={styles.trustFooter}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.trustText}>
              256-bit SSL Encrypted • Powered by <Text style={styles.razorpayBold}>Razorpay</Text>
            </Text>
          </View>

          {/* Action CTA */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
              onPress={handlePay}
              disabled={isProcessing}
              activeOpacity={0.85}
            >
              {isProcessing ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.payButtonText}>Pay ₹{amount} & Confirm Spot</Text>
              )}
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
    width: Math.min(width - 32, 440),
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0C2340',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subBrand: {
    fontSize: 11,
    color: '#93C5FD',
    marginTop: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  compLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    maxWidth: 200,
  },
  feeLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  amountValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  methodsContainer: {
    padding: 16,
  },
  methodsHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 10,
  },
  methodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  methodItemSelected: {
    backgroundColor: '#E6F4F3',
    borderColor: COLORS.primary,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  methodName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  methodNameSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  trustFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  lockIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  trustText: {
    fontSize: 11,
    color: '#64748B',
  },
  razorpayBold: {
    fontWeight: '800',
    color: '#0C2340',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

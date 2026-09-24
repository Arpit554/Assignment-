import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { COLORS } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

interface UserSwitcherModalProps {
  visible: boolean;
  competitionId: string;
  onSimulateState: (status?: string, bookedSpots?: number) => void;
  onReseed: () => void;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  visible,
  onSimulateState,
  onReseed,
  onClose,
}) => {
  const { users, currentUser, switchUserById } = useAuth();

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
              <Text style={styles.title}>Evaluator / Demo Controls</Text>
              <Text style={styles.subtitle}>Test different states & user profiles</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Section 1: Switch User Persona */}
            <Text style={styles.sectionHeading}>1. Switch User Persona</Text>
            <View style={styles.usersList}>
              {users.map((user) => {
                const isSelected = currentUser?._id === user._id;
                let personaLabel = 'Unregistered (Fresh Flow)';
                if (user.name.includes('Priya')) personaLabel = 'Registered (Default Mock)';
                if (user.name.includes('Ananya')) personaLabel = 'Submitted Entry';

                return (
                  <TouchableOpacity
                    key={user._id}
                    style={[styles.userCard, isSelected && styles.userCardSelected]}
                    onPress={() => {
                      switchUserById(user._id);
                      onClose();
                    }}
                    activeOpacity={0.7}
                  >
                    <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                      <Text style={[styles.userName, isSelected && styles.textPrimary]}>
                        {user.name} {isSelected && '✓'}
                      </Text>
                      <Text style={styles.userPersona}>{personaLabel}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Section 2: Simulate Competition Lifecycle */}
            <Text style={styles.sectionHeading}>2. Simulate Competition Lifecycle</Text>
            <View style={styles.btnGrid}>
              <TouchableOpacity
                style={styles.stateBtn}
                onPress={() => {
                  onSimulateState('REGISTRATION_OPEN', 1);
                  onClose();
                }}
              >
                <Text style={styles.stateBtnText}>🟢 Open (1/20 Booked)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.stateBtn}
                onPress={() => {
                  onSimulateState('REGISTRATION_OPEN', 20);
                  onClose();
                }}
              >
                <Text style={styles.stateBtnText}>🔴 Full (20/20 Spots)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.stateBtn}
                onPress={() => {
                  onSimulateState('RESULTS_DECLARED');
                  onClose();
                }}
              >
                <Text style={styles.stateBtnText}>🏆 Results Declared</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.stateBtn, styles.resetBtn]}
                onPress={() => {
                  onReseed();
                  onClose();
                }}
              >
                <Text style={styles.resetBtnText}>🔄 Reset All to Seed</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeActionBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.closeActionText}>Close</Text>
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
  sectionHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 4,
  },
  usersList: {
    gap: 8,
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userCardSelected: {
    backgroundColor: '#E6F4F3',
    borderColor: COLORS.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  textPrimary: {
    color: COLORS.primary,
  },
  userPersona: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  btnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stateBtn: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  stateBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  resetBtn: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  resetBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  closeActionBtn: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeActionText: {
    color: '#64748B',
    fontWeight: '700',
    fontSize: 12,
  },
});

import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { COLORS } from '../../theme/colors';
import { useLanguage } from '../../context/LanguageContext';

interface SubmissionModalProps {
  visible: boolean;
  competitionTitle: string;
  initialValues?: {
    title?: string;
    videoUrl?: string;
    description?: string;
    danceStyle?: string;
  } | null;
  onSubmit: (data: { title: string; videoUrl: string; description: string; danceStyle: string }) => Promise<void>;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const DANCE_STYLES = ['Kathak', 'Bharatnatyam', 'Odissi', 'Kuchipudi', 'Mohiniyattam', 'Kathakali', 'Semi-Classical'];

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  visible,
  competitionTitle,
  initialValues,
  onSubmit,
  onClose,
}) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState(initialValues?.title || '');
  const [videoUrl, setVideoUrl] = useState(initialValues?.videoUrl || '');
  const [danceStyle, setDanceStyle] = useState(initialValues?.danceStyle || 'Kathak');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrorMessage('Please enter your performance title.');
      return;
    }
    if (!videoUrl.trim()) {
      setErrorMessage('Please provide a valid video URL (YouTube, Drive, or Cloud link).');
      return;
    }

    try {
      setErrorMessage('');
      setIsSubmitting(true);
      await onSubmit({
        title: title.trim(),
        videoUrl: videoUrl.trim(),
        description: description.trim(),
        danceStyle,
      });
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit entry. Please try again.');
    } finally {
      setIsSubmitting(false);
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
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.modalTitle}>{t.uploadSubmission}</Text>
              <Text style={styles.subTitle} numberOfLines={1}>
                {competitionTitle}
              </Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
              </View>
            ) : null}

            {/* Performance Title Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Performance Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Kathak Tarana in Teental - Raag Darbari"
                placeholderTextColor="#94A3B8"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* Dance Style Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Classical Dance Style *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleScroll}>
                {DANCE_STYLES.map((style) => (
                  <TouchableOpacity
                    key={style}
                    style={[styles.styleChip, danceStyle === style && styles.styleChipActive]}
                    onPress={() => setDanceStyle(style)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.styleChipText, danceStyle === style && styles.styleChipTextActive]}>
                      {style}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Video URL Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Video Link (YouTube / Drive / MP4) *</Text>
              <TextInput
                style={styles.input}
                placeholder="https://youtube.com/watch?v=... or Drive link"
                placeholderTextColor="#94A3B8"
                value={videoUrl}
                onChangeText={setVideoUrl}
                autoCapitalize="none"
              />
              <Text style={styles.helperText}>
                Ensure video privacy is set to Public or Anyone with the link.
              </Text>
            </View>

            {/* Performance Notes / Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes for the Judge (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Share your raag, taal, guru details, or duration..."
                placeholderTextColor="#94A3B8"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.85}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitText}>Submit Entry</Text>
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
    width: Math.min(width - 32, 480),
    maxHeight: '90%',
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
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: 'bold',
  },
  body: {
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  styleScroll: {
    flexDirection: 'row',
  },
  styleChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  styleChipActive: {
    backgroundColor: '#E6F4F3',
    borderColor: COLORS.primary,
  },
  styleChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  styleChipTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  submitBtn: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

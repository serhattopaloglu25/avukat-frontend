// Feature Flags for AvukatAjanda
// These flags control which features are enabled in the application

export const FEATURES = {
  dejure: true,           // Emsal dava arama entegrasyonu
  calendarSync: true,     // Takvim senkronizasyonu
  dashboardCharts: true,  // Dashboard grafikleri
  invoicing: true,        // Faturalama sistemi
  smsReminders: true,     // SMS hatırlatıcıları
  uyap: false,           // UYAP entegrasyonu (prod öncesi kapalı)
  preAccounting: true,    // Ön muhasebe modülü
} as const;

export type FeatureKey = keyof typeof FEATURES;

export const isFeatureEnabled = (feature: FeatureKey): boolean => {
  return FEATURES[feature];
};
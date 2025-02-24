// store the locale and currency code mapping
export interface LocaleCurrencyOption {
  locale: string;
  currencyCode: string;
}

export const localeCurrency: Array<LocaleCurrencyOption> = [
  { locale: 'en-US', currencyCode: 'USD' },
  { locale: 'en-GB', currencyCode: 'GBP' },
  { locale: 'fr-FR', currencyCode: 'EUR' },
  { locale: 'de-DE', currencyCode: 'EUR' },
  { locale: 'es-ES', currencyCode: 'EUR' },
  { locale: 'ja-JP', currencyCode: 'JPY' },
  { locale: 'zh-CN', currencyCode: 'CNY' },
  { locale: 'ru-RU', currencyCode: 'RUB' },
  { locale: 'hi-IN', currencyCode: 'INR' },
  { locale: 'ko-KR', currencyCode: 'KRW' },
  { locale: 'ar-SA', currencyCode: 'SAR' }
];
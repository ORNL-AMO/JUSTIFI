// store the locale and currency code mapping
export interface LocaleCurrencyOption {
  locale: string;
  currencyCode: string;
  unicode: string
}

export const localeCurrency: Array<LocaleCurrencyOption> = [
  { locale: 'en-US', currencyCode: 'USD', unicode: '\u0024' },
  { locale: 'en-GB', currencyCode: 'GBP', unicode: '\u00A3' },
  { locale: 'fr-FR', currencyCode: 'EUR', unicode: '\u20AC' },
  { locale: 'de-DE', currencyCode: 'EUR', unicode: '\u20AC' },
  { locale: 'es-ES', currencyCode: 'EUR', unicode: '\u20AC' },
  { locale: 'ja-JP', currencyCode: 'JPY', unicode: '\u00A5' },
  { locale: 'zh-CN', currencyCode: 'CNY', unicode: '\u00A5' },
  { locale: 'ru-RU', currencyCode: 'RUB', unicode: 'RUB' },
  { locale: 'hi-IN', currencyCode: 'INR', unicode: '\u20B9' },
  { locale: 'ko-KR', currencyCode: 'KRW', unicode: '\u20A9' },
  { locale: 'ar-SA', currencyCode: 'SAR', unicode: 'SAR' }
];
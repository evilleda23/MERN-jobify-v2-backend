import i18n from 'i18next';
import FsBackend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
export class i18nAdapter {
  static create(languageDetector: typeof LanguageDetector) {
    i18n
      .use(FsBackend)
      .use(languageDetector)
      .init({
        // debug: true,
        fallbackLng: 'es',
        preload: ['es', 'en'],
        ns: ['translation'],
        saveMissing: true,
        defaultNS: 'translation',
        backend: {
          loadPath: 'src/domain/i18n/{{lng}}/{{ns}}.json',
          addPath: 'src/domain/i18n/{{lng}}/{{ns}}.missing.json',
        },
        interpolation: {
          escapeValue: false,
        },
      });
    return i18n;
  }
}

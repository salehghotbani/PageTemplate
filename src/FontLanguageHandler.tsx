import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Global } from '@emotion/react';
import shabnam_bold from '@/project_assets/fonts/Shabnam-Bold-FD.woff';
import shabnam_regular from '@/project_assets/fonts/Shabnam-FD.woff';
import shabnam_light from '@/project_assets/fonts/Shabnam-Light-FD.woff';
import shabnam_medium from '@/project_assets/fonts/Shabnam-Medium-FD.woff';
import shabnam_thin from '@/project_assets/fonts/Shabnam-Thin-FD.woff';

export function FontLanguageHandler(): React.JSX.Element {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isFa = i18n.resolvedLanguage?.startsWith('fa') ?? true;

    document.documentElement.lang = isFa ? 'fa' : 'en';
    document.documentElement.dir = isFa ? 'rtl' : 'ltr';

    document.documentElement.style.setProperty(
      '--app-font-body',
      isFa
        ? `'shabnam', Tahoma, sans-serif`
        : `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    );
  }, [i18n.resolvedLanguage]);

  return (
    <Global
      styles={{
        '@font-face': [
          {
            fontFamily: 'shabnam',
            fontStyle: 'normal',
            fontWeight: 100,
            src: `url(${shabnam_thin}) format('woff')`,
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'shabnam',
            fontStyle: 'normal',
            fontWeight: 300,
            src: `url(${shabnam_light}) format('woff')`,
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'shabnam',
            fontStyle: 'normal',
            fontWeight: 400,
            src: `url(${shabnam_regular}) format('woff')`,
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'shabnam',
            fontStyle: 'normal',
            fontWeight: 500,
            src: `url(${shabnam_medium}) format('woff')`,
            fontDisplay: 'swap',
          },
          {
            fontFamily: 'shabnam',
            fontStyle: 'normal',
            fontWeight: 700,
            src: `url(${shabnam_bold}) format('woff')`,
            fontDisplay: 'swap',
          },
        ],
      }}
    />
  );
}

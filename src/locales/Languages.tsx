import { Button } from '@chakra-ui/react';
import { Languages as LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Languages() {
  const { i18n, t } = useTranslation();
  const nextLanguage = i18n.resolvedLanguage === 'en' ? 'fa' : 'en';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => void i18n.changeLanguage(nextLanguage)}
      aria-label={t('language.switch')}
    >
      <LanguagesIcon />
      <span lang={nextLanguage}>{t('language.next')}</span>
    </Button>
  );
}

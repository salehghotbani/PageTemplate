import { Center, HStack, Spinner, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function PageLoader() {
  const { t } = useTranslation();

  return (
    <Center role="status" minH="40dvh" bg="bg" color="fg">
      <HStack gap="2">
        <Spinner color="accent.fg" size="sm" />
        <Text>{t('common.loading')}</Text>
      </HStack>
    </Center>
  );
}

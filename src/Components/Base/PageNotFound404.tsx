import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LANDING_ROUTE } from './BaseRouts';

export default function PageNotFound404() {
  const { t } = useTranslation();

  return (
    <Stack align="start" gap="4">
      <Heading as="h1">{t('notFound.title')}</Heading>
      <Text color="fg.muted">{t('notFound.description')}</Text>
      <Button asChild variant="outline">
        <Link to={LANDING_ROUTE}>{t('nav.home')}</Link>
      </Button>
    </Stack>
  );
}

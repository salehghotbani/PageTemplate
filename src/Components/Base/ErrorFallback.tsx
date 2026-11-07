import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LANDING_ROUTE } from './BaseRouts';

export default function ErrorFallback() {
  const { t, i18n } = useTranslation();

  return (
    <Box
      as="main"
      dir={i18n.dir()}
      p="4"
      minH="100dvh"
      display="grid"
      placeItems="center"
      bg="bg"
    >
      <Stack
        role="alert"
        maxW="lg"
        w="full"
        p="6"
        bg="bg.panel"
        borderWidth="1px"
        rounded="surface"
        gap="4"
      >
        <Heading as="h1" size="lg">
          {t('common.pageError')}
        </Heading>
        <Text color="fg.muted">{t('common.pageErrorDescription')}</Text>
        <Button onClick={() => window.location.reload()}>
          {t('common.retry')}
        </Button>
        <Button asChild variant="outline">
          <a href={LANDING_ROUTE}>{t('nav.home')}</a>
        </Button>
      </Stack>
    </Box>
  );
}

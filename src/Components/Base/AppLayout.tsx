import { Box, chakra, Container, LocaleProvider } from '@chakra-ui/react';
import { Outlet, ScrollRestoration } from 'react-router';
import { useTranslation } from 'react-i18next';
import { FontLanguageHandler } from '@/FontLanguageHandler';
import { Toaster } from '@/Components/ui/toaster';
import Navbar from './Navbar';

export default function AppLayout() {
  const { i18n, t } = useTranslation();

  return (
    <LocaleProvider locale={i18n.resolvedLanguage ?? 'fa'}>
      <FontLanguageHandler />
      <Box minH="100dvh" bg="bg" color="fg">
        <chakra.a
          href="#main-content"
          position="absolute"
          insetInlineStart="4"
          top="4"
          zIndex="docked"
          bg="bg.panel"
          p="3"
          rounded="control"
          srOnly
          _focusVisible={{ srOnly: false }}
        >
          {t('nav.skip')}
        </chakra.a>
        <Navbar />
        <Container
          as="main"
          id="main-content"
          tabIndex={-1}
          maxW="5xl"
          px="4"
          py={{ base: '6', md: '12' }}
        >
          <Outlet />
        </Container>
      </Box>
      <Toaster />
      <ScrollRestoration getKey={({ pathname }) => pathname} />
    </LocaleProvider>
  );
}

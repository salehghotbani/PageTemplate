import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ColorModeButton } from '@/Components/ui/color-mode';
import Languages from '@/locales/Languages';
import { EXAMPLE_ROUTE, LANDING_ROUTE } from './BaseRouts';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <Box as="header" bg="bg.panel" borderBottomWidth="1px">
      <Container maxW="5xl" px="4" py="3">
        <Flex align="center" justify="space-between" wrap="wrap" gap="2">
          <Flex as="nav" aria-label={t('nav.label')} gap="1">
            <Button
              asChild
              size="sm"
              variant="ghost"
              _currentPage={{ bg: 'bg.subtle', color: 'accent.fg' }}
            >
              <NavLink to={LANDING_ROUTE} end>
                {t('nav.home')}
              </NavLink>
            </Button>
            <Button
              asChild
              size="sm"
              variant="ghost"
              _currentPage={{ bg: 'bg.subtle', color: 'accent.fg' }}
            >
              <NavLink to={EXAMPLE_ROUTE}>{t('nav.example')}</NavLink>
            </Button>
          </Flex>
          <Flex align="center" gap="1">
            <Languages />
            <ColorModeButton />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

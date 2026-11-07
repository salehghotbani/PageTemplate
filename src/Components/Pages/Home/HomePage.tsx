import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { EXAMPLE_ROUTE } from '@/Components/Base/BaseRouts';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <Stack
      align="start"
      gap="5"
      p={{ base: '5', md: '9' }}
      bg="bg.panel"
      borderWidth="1px"
      rounded="surface"
    >
      <Heading as="h1" size={{ base: '2xl', md: '4xl' }}>
        {t('home.title')}
      </Heading>
      <Text color="fg.muted" maxW="56ch">
        {t('home.description')}
      </Text>
      <Button
        asChild
        bg="action.bg"
        color="action.fg"
        _hover={{ bg: 'action.hover' }}
      >
        <Link to={EXAMPLE_ROUTE}>{t('home.openExample')}</Link>
      </Button>
    </Stack>
  );
}

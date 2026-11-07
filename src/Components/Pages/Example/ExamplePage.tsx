import { Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import PageLoader from '@/Components/Base/PageLoader';
import { listExampleItems } from '@/Components/Base/api/exampleApi';
import { useRouteFilters } from '@/Components/Base/useRouteFilters';
import ExampleFilter from './ExampleFilter';

export default function ExamplePage() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === 'en';
  const { getFilter, setFilters } = useRouteFilters();
  const query = getFilter('q');
  const { data, isPending, isError, isFetching, refetch } = useQuery({
    queryKey: ['example-items'],
    queryFn: ({ signal }) => listExampleItems(signal),
  });
  const term = query.trim().toLowerCase();
  const visibleItems = data
    ?.map(({ id, title, description }) => ({
      id,
      title: isEnglish ? title.en : title.fa,
      description: isEnglish ? description.en : description.fa,
    }))
    .filter(({ title, description }) =>
      `${title} ${description}`.toLowerCase().includes(term),
    );

  return (
    <Stack gap="6">
      <Stack gap="2">
        <Heading as="h1">{t('example.title')}</Heading>
        <Text color="fg.muted">{t('example.description')}</Text>
      </Stack>
      <ExampleFilter
        query={query}
        onFilter={(next) => setFilters({ q: next })}
      />
      {isPending && <PageLoader />}
      {isError && (
        <Stack role="alert" align="start" gap="2">
          <Text>{t('example.error')}</Text>
          <Button
            variant="outline"
            loading={isFetching}
            onClick={() => void refetch()}
          >
            {t('common.retry')}
          </Button>
        </Stack>
      )}
      {visibleItems?.length === 0 && (
        <Text role="status">{t('example.empty')}</Text>
      )}
      {Boolean(visibleItems?.length) && (
        <SimpleGrid
          as="ul"
          columns={{ base: 1, md: 3 }}
          gap="4"
          listStyleType="none"
        >
          {visibleItems?.map(({ id, title, description }) => (
            <Stack
              as="li"
              key={id}
              p="4"
              bg="bg.panel"
              borderWidth="1px"
              rounded="widget"
              gap="2"
            >
              <Heading as="h2" size="md">
                {title}
              </Heading>
              <Text color="fg.muted">{description}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

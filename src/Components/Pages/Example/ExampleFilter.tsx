import { zodResolver } from '@hookform/resolvers/zod';
import { Button, chakra, Field, Flex, Input } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const filterSchema = z.object({ query: z.string().trim().max(80) });

interface ExampleFilterProps {
  query: string;
  onFilter: (query: string) => void;
}

export default function ExampleFilter({ query, onFilter }: ExampleFilterProps) {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(filterSchema),
    values: { query },
  });

  return (
    <chakra.form
      display="flex"
      flexDirection="column"
      noValidate
      onSubmit={handleSubmit(({ query }) => onFilter(query))}
      gap="3"
    >
      <Field.Root invalid={Boolean(errors.query)}>
        <Field.Label>{t('example.query')}</Field.Label>
        <Controller
          control={control}
          name="query"
          render={({ field }) => <Input type="search" {...field} />}
        />
        <Field.ErrorText>
          {errors.query && t('example.queryTooLong')}
        </Field.ErrorText>
      </Field.Root>
      <Flex gap="2" wrap="wrap">
        <Button
          type="submit"
          bg="action.bg"
          color="action.fg"
          _hover={{ bg: 'action.hover' }}
        >
          {t('example.search')}
        </Button>
        {query && (
          <Button type="button" variant="outline" onClick={() => onFilter('')}>
            {t('example.clear')}
          </Button>
        )}
      </Flex>
    </chakra.form>
  );
}

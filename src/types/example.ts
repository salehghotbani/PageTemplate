import { z } from 'zod';

const localizedText = z.object({ fa: z.string(), en: z.string() });

export const exampleItemSchema = z.object({
  id: z.string().min(1),
  title: localizedText,
  description: localizedText,
});

export type ExampleItem = z.infer<typeof exampleItemSchema>;
